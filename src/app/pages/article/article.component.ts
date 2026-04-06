import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
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
  protected readonly lightboxOpen = signal(false);
  protected readonly lightboxSrc = signal('');
  protected readonly lightboxCaption = signal('');
  protected readonly lightboxWidth = signal(1200);
  protected readonly lightboxHeight = signal(900);
  protected readonly prevLink = signal<string | null>(null);
  protected readonly prevTitle = signal<string | null>(null);
  protected readonly nextLink = signal<string | null>(null);
  protected readonly nextTitle = signal<string | null>(null);

  private readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

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
        },
        error: () => {
          this.content.set('');
          this.isLoading.set(false);
          this.notFound.set(true);
        },
      });
  }

  protected onArticleClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (!target || target.tagName !== 'IMG') {
      return;
    }

    const imageElement = target as HTMLImageElement;
    event.preventDefault();

    this.lightboxSrc.set(imageElement.currentSrc || imageElement.src);
    this.lightboxCaption.set(imageElement.alt || '');
    this.lightboxWidth.set(imageElement.naturalWidth || 1200);
    this.lightboxHeight.set(imageElement.naturalHeight || 900);
    this.lightboxOpen.set(true);
  }

  protected closeLightbox() {
    this.lightboxOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape() {
    if (this.lightboxOpen()) {
      this.closeLightbox();
    }
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
}
