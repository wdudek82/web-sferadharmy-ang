import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleService } from '../../../services/article.service';
import { eventsData, resolveEventHref } from '../event-data';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [MarkdownModule, RouterLink],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  protected readonly content = signal('');
  protected readonly isLoading = signal(true);
  protected readonly notFound = signal(false);
  protected readonly prevLink = signal<string | null>(null);
  protected readonly prevTitle = signal<string | null>(null);
  protected readonly nextLink = signal<string | null>(null);
  protected readonly nextTitle = signal<string | null>(null);

  @ViewChild('articleContent') private articleContent?: ElementRef<HTMLElement>;

  private readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private lightboxInitPending = false;

  constructor() {
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((params) => params.get('id')),
        filter((id): id is string => Boolean(id)),
        tap(() => {
            if (isPlatformBrowser(this.platformId)) {
                window.scrollTo({ top: 0, left: 0 });
            }
        }),
        switchMap((id) => {
          this.updateNav(id);
          return this.articleService.getArticle(id, 'event-content');
        }),
      )
      .subscribe({
        next: (markdown) => {
          this.content.set(markdown);
          this.isLoading.set(false);
          this.notFound.set(false);
          this.queueLightboxInit();
        },
        error: () => {
          this.content.set('');
          this.isLoading.set(false);
          this.notFound.set(true);
        },
      });
  }

  private updateNav(id: string) {
    const index = eventsData.findIndex((event) => event.id === id);
    const prev = index > 0 ? eventsData[index - 1] : null;
    const next = index >= 0 && index < eventsData.length - 1 ? eventsData[index + 1] : null;

    this.prevLink.set(prev ? resolveEventHref(prev) : null);
    this.prevTitle.set(prev ? prev.title : null);
    this.nextLink.set(next ? resolveEventHref(next) : null);
    this.nextTitle.set(next ? next.title : null);
  }

  private queueLightboxInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.lightboxInitPending) {
      return;
    }

    this.lightboxInitPending = true;
    window.setTimeout(() => {
      this.lightboxInitPending = false;
      this.convertTitledImagesToFigures();
      this.prepareLightboxImages();
    }, 0);
  }

  private convertTitledImagesToFigures() {
    const host = this.articleContent?.nativeElement;
    if (!host) {
      return;
    }

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

  private prepareLightboxImages() {
    const host = this.articleContent?.nativeElement;
    if (!host) {
      return;
    }

    const images = Array.from(host.querySelectorAll('img'));
    images.forEach((image) => {
      const figureCaption = image.closest('figure')?.querySelector('figcaption')?.textContent?.trim() ?? '';
      const imageTitle = image.getAttribute('title')?.trim() ?? '';
      const lightboxTitle = figureCaption || imageTitle || image.alt || '';
      const pictureParent = image.parentElement?.tagName === 'PICTURE' ? image.parentElement : null;
      const wrapperTarget = pictureParent ?? image;
      const anchorParent = wrapperTarget.parentElement;

      if (anchorParent?.tagName === 'A') {
        const anchor = anchorParent as HTMLAnchorElement;
        if (!anchor.dataset['lightbox']) {
          anchor.dataset['lightbox'] = 'article-gallery';
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
      anchor.dataset['lightbox'] = 'article-gallery';
      if (lightboxTitle) {
        anchor.dataset['title'] = lightboxTitle;
      }

      wrapperTarget.parentElement.insertBefore(anchor, wrapperTarget);
      anchor.appendChild(wrapperTarget);
    });
  }
}
