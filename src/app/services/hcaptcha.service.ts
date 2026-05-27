import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    hcaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
        },
      ) => number;
      reset: (id?: number) => void;
    };
  }
}

/**
 * Manages hCaptcha script loading, widget rendering, and token lifecycle.
 * Components call init() in ngAfterViewInit and read the token signal.
 */
@Injectable({ providedIn: 'root' })
export class HcaptchaService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sitekey = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';

  private widgetId?: number;
  private loaderPromise?: Promise<void>;

  readonly token = signal('');
  isLocalhost = false;

  /** Inits hCaptcha. Must be called in browser only. */
  init(containerId = 'hcaptcha-container'): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const hostname = window.location.hostname;
    this.isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    if (this.isLocalhost) {
      return;
    }

    this.ensureScript()
      .then(() => this.render(containerId))
      .catch(() => {
        // If the script fails, the submit handler will still block without a token.
      });
  }

  /** Resets the widget and clears the token. */
  reset(): void {
    if (window.hcaptcha && this.widgetId !== undefined) {
      window.hcaptcha.reset(this.widgetId);
    }
    this.token.set('');
  }

  private ensureScript(): Promise<void> {
    if (window.hcaptcha) {
      return Promise.resolve();
    }
    if (this.loaderPromise) {
      return this.loaderPromise;
    }

    this.loaderPromise = new Promise((resolve, reject) => {
      const scriptId = 'hcaptcha-script';
      const existing = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener(
          'error',
          () => reject(new Error('hCaptcha failed to load')),
          { once: true },
        );
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        'https://js.hcaptcha.com/1/api.js?render=explicit&hl=pl&recaptchacompat=off';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('hCaptcha failed to load'));
      document.body.appendChild(script);
    });

    return this.loaderPromise;
  }

  private render(containerId: string): void {
    if (!window.hcaptcha) {
      return;
    }
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }
    this.widgetId = window.hcaptcha.render(container, {
      sitekey: this.sitekey,
      callback: (t) => this.token.set(t),
      'expired-callback': () => this.token.set(''),
    });
  }
}
