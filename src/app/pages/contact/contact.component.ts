import { isPlatformBrowser, NgIf } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare global {
  interface Window {
    hcaptcha?: {
      render: (container: HTMLElement, options: { sitekey: string }) => number;
    };
  }
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  private readonly hcaptchaSitekey = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';
  private hcaptchaWidgetId?: number;
  private hcaptchaLoader?: Promise<void>;
  protected isLocalhost = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const hostname = window.location.hostname;
    this.isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    if (this.isLocalhost) {
      return;
    }

    this.ensureHcaptchaScript()
      .then(() => this.renderHcaptcha())
      .catch(() => {
        // If the script fails, the submit handler will still block without a token.
      });
  }

  onSubmit(event: Event) {
    if (this.isLocalhost) {
      return;
    }

    const form = event.target as HTMLFormElement | null;
    const hCaptcha =
      form?.querySelector<HTMLTextAreaElement>('textarea[name="h-captcha-response"]')?.value ?? '';

    if (!hCaptcha) {
      event.preventDefault();
      alert('Please fill out captcha field');
    }
  }

  private ensureHcaptchaScript(): Promise<void> {
    if (window.hcaptcha) {
      return Promise.resolve();
    }

    if (this.hcaptchaLoader) {
      return this.hcaptchaLoader;
    }

    this.hcaptchaLoader = new Promise((resolve, reject) => {
      const scriptId = 'hcaptcha-script';
      const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(), { once: true });
        existingScript.addEventListener('error', () => reject(new Error('hCaptcha failed to load')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&hl=pl';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('hCaptcha failed to load'));
      document.body.appendChild(script);
    });

    return this.hcaptchaLoader;
  }

  private renderHcaptcha() {
    if (!window.hcaptcha) {
      return;
    }

    const container = document.getElementById('hcaptcha-container');
    if (!container) {
      return;
    }

    this.hcaptchaWidgetId = window.hcaptcha.render(container, {
      sitekey: this.hcaptchaSitekey
    });
  }
}
