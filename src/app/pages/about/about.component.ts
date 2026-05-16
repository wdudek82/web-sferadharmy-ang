import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutContent') private aboutContent?: ElementRef<HTMLElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private lightboxInitPending = false;

  ngAfterViewInit(): void {
    this.queueLightboxInit();
  }

  private queueLightboxInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.lightboxInitPending) {
      return;
    }

    this.lightboxInitPending = true;
    // Use a slightly longer delay to ensure DOM is fully ready and images are loaded
    window.setTimeout(() => {
      this.lightboxInitPending = false;
      this.prepareLightboxImages();

      // Trigger Lightbox to scan the new DOM elements
      // First try to destroy if it exists to force a clean re-init
      const lb = (window as any).lightbox;
      if (lb && typeof lb.init === 'function') {
        // Lightbox2 doesn't have a public destroy() but calling init()
        // usually re-binds if things changed.
        // However, we want to make sure it sees the new 'a' tags.
        lb.init();
      }
    }, 100);
  }

  private prepareLightboxImages() {
    const host = this.aboutContent?.nativeElement;
    if (!host) {
      return;
    }

    // Only target images in the "Mistrz Hua" section as per requirements
    const mistrzHuaSection = host.querySelector('#mistrz-hua');
    if (!mistrzHuaSection) {
      return;
    }

    const images = Array.from(mistrzHuaSection.querySelectorAll('img'));
    images.forEach((image) => {
      // Check if image is already wrapped to avoid double wrapping
      if (image.parentElement?.tagName === 'A' && image.parentElement.dataset['lightbox']) {
        return;
      }
      const lightboxTitle = image.alt || '';
      const wrapperTarget = image;
      const anchorParent = wrapperTarget.parentElement;

      if (anchorParent?.tagName === 'A') {
        const anchor = anchorParent as HTMLAnchorElement;
        if (!anchor.dataset['lightbox']) {
          anchor.dataset['lightbox'] = 'mistrz-hua-gallery';
        }
        if (lightboxTitle && !anchor.dataset['title']) {
          anchor.dataset['title'] = lightboxTitle;
        }
        if (!anchor.getAttribute('href')) {
          anchor.href = (image as any).currentSrc || image.src;
        }
        return;
      }

      const href = (image as any).currentSrc || image.src;
      if (!href || !wrapperTarget.parentElement) {
        return;
      }

      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.dataset['lightbox'] = 'mistrz-hua-gallery';
      if (lightboxTitle) {
        anchor.dataset['title'] = lightboxTitle;
      }

      wrapperTarget.parentElement.insertBefore(anchor, wrapperTarget);
      anchor.appendChild(wrapperTarget);
    });
  }
}
