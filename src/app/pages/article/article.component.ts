import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleService } from '../../services/article.service';
import { textsData } from '../texts/texts-data';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MarkdownModule, RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
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
        tap(() => window.scrollTo({ top: 0, left: 0 })),
        switchMap((id) => {
          this.updateNav(id);
          return this.articleService.getArticle(id);
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
    const index = textsData.findIndex((text) => text.id === id);
    const prev = index > 0 ? textsData[index - 1] : null;
    const next = index >= 0 && index < textsData.length - 1 ? textsData[index + 1] : null;

    this.prevLink.set(prev ? prev.href : null);
    this.prevTitle.set(prev ? prev.title : null);
    this.nextLink.set(next ? next.href : null);
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
      this.prepareLightboxImages();
    }, 0);
  }

  private prepareLightboxImages() {
    const host = this.articleContent?.nativeElement;
    if (!host) {
      return;
    }

    const images = Array.from(host.querySelectorAll('img'));
    images.forEach((image) => {
      const pictureParent = image.parentElement?.tagName === 'PICTURE' ? image.parentElement : null;
      const wrapperTarget = pictureParent ?? image;
      const anchorParent = wrapperTarget.parentElement;

      if (anchorParent?.tagName === 'A') {
        const anchor = anchorParent as HTMLAnchorElement;
        if (!anchor.dataset['lightbox']) {
          anchor.dataset['lightbox'] = 'article-gallery';
        }
        if (image.alt && !anchor.dataset['title']) {
          anchor.dataset['title'] = image.alt;
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
      if (image.alt) {
        anchor.dataset['title'] = image.alt;
      }

      wrapperTarget.parentElement.insertBefore(anchor, wrapperTarget);
      anchor.appendChild(wrapperTarget);
    });
  }
}
