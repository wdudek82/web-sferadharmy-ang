import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleViewerBase } from '../../../shared/article-viewer-base';
import { eventsData, resolveEventHref } from '../event-data';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [MarkdownModule, RouterLink],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent extends ArticleViewerBase {
  protected readonly dataItems = eventsData;
  protected readonly resolveItemHref = resolveEventHref;
  protected readonly contentFolder = 'event-content';
  protected readonly loadingLabel = 'Wczytywanie wydarzenia…';
  protected readonly notFoundLabel = 'Nie znaleziono tego wydarzenia.';
}
