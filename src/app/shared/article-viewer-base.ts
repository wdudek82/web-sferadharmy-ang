import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, Directive, ElementRef, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ArticleService, ContentFolder } from '../services/article.service';
import { LightboxService } from '../services/lightbox.service';

/**
 * Shared base for article-viewing page components (events, texts, etc.).
 * Subclasses provide data items, href resolver, content-type, and i18n labels.
 *
 * The concrete component must have a template with:
 *   - A `#articleContent` element wrapping the markdown content
 *   - Bindings for `loadingLabel`, `notFoundLabel`, and all public signals
 */
@Directive()
export abstract class ArticleViewerBase {
  protected readonly content = signal('');
  protected readonly isLoading = signal(true);
  protected readonly notFound = signal(false);
  protected readonly prevLink = signal<string | null>(null);
  protected readonly prevTitle = signal<string | null>(null);
  protected readonly nextLink = signal<string | null>(null);
  protected readonly nextTitle = signal<string | null>(null);

  @ViewChild('articleContent') protected articleContent?: ElementRef<HTMLElement>;

  protected readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly lightboxService = inject(LightboxService);
  private lightboxInitPending = false;

  // -- subclasses must provide these -------------------------------------------------

  /** The array of summary items for prev/next navigation. */
  protected abstract get dataItems(): Array<{ id: string; title: string; href?: string }>;

  /** Resolves a navigation href from a summary item. */
  protected abstract resolveItemHref(item: { id: string; href?: string }): string;

  /** Content folder name passed to ArticleService.getArticle(). */
  protected abstract get contentFolder(): ContentFolder;

  /** Shown while the article is loading. */
  protected abstract get loadingLabel(): string;

  /** Shown when the article is not found. */
  protected abstract get notFoundLabel(): string;

  // -- constructor pipeline ----------------------------------------------------------

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
          return this.articleService.getArticle(id, this.contentFolder);
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

  // -- navigation --------------------------------------------------------------------

  private updateNav(id: string): void {
    const index = this.dataItems.findIndex((item) => item.id === id);
    const prev = index > 0 ? this.dataItems[index - 1] : null;
    const next =
      index >= 0 && index < this.dataItems.length - 1 ? this.dataItems[index + 1] : null;

    this.prevLink.set(prev ? this.resolveItemHref(prev) : null);
    this.prevTitle.set(prev ? prev.title : null);
    this.nextLink.set(next ? this.resolveItemHref(next) : null);
    this.nextTitle.set(next ? next.title : null);
  }

  // -- lightbox ----------------------------------------------------------------------

  private queueLightboxInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (this.lightboxInitPending) {
      return;
    }

    this.lightboxInitPending = true;
    window.setTimeout(() => {
      this.lightboxInitPending = false;
      const host = this.articleContent?.nativeElement;
      if (host) {
        this.lightboxService.scheduleLightboxInit(host, { includeFigures: true });
      }
    }, 200);
  }
}
