import { Injectable } from '@angular/core';

/**
 * Pure DOM utilities for lightbox/gallery image wrapping.
 * Components keep their own scheduling/guard logic.
 */
@Injectable({ providedIn: 'root' })
export class LightboxService {
  /**
   * Finds <img title="..."> elements not yet inside a <figure>,
   * wraps them in <figure> + <figcaption>, unwrapping from <p> when possible.
   */
  wrapTitledImagesInFigures(host: HTMLElement): void {
    const titledImages = Array.from(host.querySelectorAll('img[title]'));
    titledImages.forEach((image) => {
      if (image.closest('figure')) {
        return;
      }

      const title = image.getAttribute('title')?.trim();
      if (!title) {
        image.removeAttribute('title');
        return;
      }

      const parent = image.parentElement;
      if (!parent) {
        return;
      }

      const figure = document.createElement('figure');
      figure.className = 'article-figure';

      const caption = document.createElement('figcaption');
      caption.textContent = title;

      const mediaNode = parent.tagName === 'A' ? parent : image;
      const container = mediaNode.parentElement;
      if (!container) {
        return;
      }

      const containerChildren = Array.from(container.childNodes);
      const containsOnlyMediaNode = containerChildren.every((node) => {
        if (node === mediaNode) {
          return true;
        }
        return node.nodeType === Node.TEXT_NODE && !node.textContent?.trim();
      });

      if (container.tagName === 'P') {
        if (!containsOnlyMediaNode || !container.parentElement) {
          return;
        }
        image.removeAttribute('title');
        figure.appendChild(mediaNode);
        figure.appendChild(caption);
        container.parentElement.insertBefore(figure, container);
        container.remove();
        return;
      }

      image.removeAttribute('title');
      container.insertBefore(figure, mediaNode);
      figure.appendChild(mediaNode);
      figure.appendChild(caption);
    });
  }

  /**
   * Wraps <img> elements (optionally scoped to a CSS selector) in lightbox <a> anchors
   * with data-lightbox and data-title attributes set.
   */
  wrapImagesForLightbox(
    host: HTMLElement,
    galleryName: string,
    scopeSelector?: string,
  ): void {
    const root = scopeSelector ? host.querySelector(scopeSelector) : host;
    if (!root) {
      return;
    }

    const images = Array.from(root.querySelectorAll('img'));
    images.forEach((image) => {
      const figureCaption =
        image.closest('figure')?.querySelector('figcaption')?.textContent?.trim() ?? '';
      const imageTitle = image.getAttribute('title')?.trim() ?? '';
      const lightboxTitle = figureCaption || imageTitle || image.alt || '';
      const pictureParent =
        image.parentElement?.tagName === 'PICTURE' ? image.parentElement : null;
      const wrapperTarget = pictureParent ?? image;
      const anchorParent = wrapperTarget.parentElement;

      if (anchorParent?.tagName === 'A') {
        const anchor = anchorParent as HTMLAnchorElement;
        if (!anchor.dataset['lightbox']) {
          anchor.dataset['lightbox'] = galleryName;
        }
        if (lightboxTitle && !anchor.dataset['title']) {
          anchor.dataset['title'] = lightboxTitle;
        }
        if (!anchor.getAttribute('href')) {
          anchor.href = image.currentSrc || image.src;
        }
        return;
      }

      const href = image.currentSrc || image.src;
      if (!href || !wrapperTarget.parentElement) {
        return;
      }

      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.dataset['lightbox'] = galleryName;
      if (lightboxTitle) {
        anchor.dataset['title'] = lightboxTitle;
      }

      wrapperTarget.parentElement.insertBefore(anchor, wrapperTarget);
      anchor.appendChild(wrapperTarget);
    });
  }

  /** Triggers the global lightbox library to re-scan the DOM. */
  triggerLightboxScan(): void {
    const lb = (window as any).lightbox;
    if (lb && typeof lb.init === 'function') {
      lb.init();
    }
  }

  /**
   * Schedules deferred lightbox initialization (wrapping + scan) via setTimeout.
   * Callers should still guard with isPlatformBrowser and their own pending flag.
   */
  scheduleLightboxInit(
    host: HTMLElement,
    options?: { galleryName?: string; scopeSelector?: string; includeFigures?: boolean },
  ): void {
    window.setTimeout(() => {
      if (options?.includeFigures) {
        this.wrapTitledImagesInFigures(host);
      }
      this.wrapImagesForLightbox(host, options?.galleryName ?? 'article-gallery', options?.scopeSelector);
      this.triggerLightboxScan();
    }, 200);
  }
}
