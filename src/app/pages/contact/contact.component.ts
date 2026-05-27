import { isPlatformBrowser, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HcaptchaService } from '../../services/hcaptcha.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly hcaptchaService = inject(HcaptchaService);
  protected readonly captchaEnabled = false;
  protected readonly isSubmitting = signal(false);
  protected readonly submitState = signal<'idle' | 'success' | 'error'>('idle');

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.hcaptchaService.init();
  }

  async onSubmit(form: NgForm, formEl: HTMLFormElement) {
    if (this.isSubmitting()) {
      return;
    }

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.captchaEnabled && !this.hcaptchaService.isLocalhost && !this.hcaptchaService.token()) {
      alert('Please fill out captcha field');
      return;
    }

    this.isSubmitting.set(true);
    this.submitState.set('idle');
    try {
      const formData = new FormData(formEl);
      const response = await fetch(formEl.action, {
        method: formEl.method,
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Form submission failed.');
      }

      formEl.reset();
      form.resetForm();
      this.submitState.set('success');

      if (this.captchaEnabled && !this.hcaptchaService.isLocalhost) {
        this.hcaptchaService.reset();
      }
    } catch (error) {
      this.submitState.set('error');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
