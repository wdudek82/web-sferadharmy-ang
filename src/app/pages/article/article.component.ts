import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs/operators';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MarkdownModule],
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

  private readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((params) => params.get('id')),
        filter((id): id is string => Boolean(id)),
        switchMap((id) => this.articleService.getArticle(id)),
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
}
