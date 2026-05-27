import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleViewerBase } from '../../shared/article-viewer-base';
import { resolveTextHref, textsData } from '../texts/texts-data';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MarkdownModule, RouterLink],
  templateUrl: './article.component.html',
  styleUrl: '../events/event/event.component.scss',
})
export class ArticleComponent extends ArticleViewerBase {
  protected readonly dataItems = textsData;
  protected readonly resolveItemHref = resolveTextHref;
  protected readonly contentFolder = 'texts';
  protected readonly loadingLabel = 'Wczytywanie tekstu…';
  protected readonly notFoundLabel = 'Nie znaleziono tego tekstu.';
}
