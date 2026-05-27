import { Component, ElementRef, Input } from '@angular/core';
import { NgOptimizedImage, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardBaseComponent } from '../../../shared/card-base';
import { resolveEventHref, EventSummary } from '../event-data';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, SlicePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent extends CardBaseComponent {
  @Input({ required: true }) event!: EventSummary;

  constructor(hostRef: ElementRef<HTMLElement>) {
    super(hostRef);
  }

  protected get href(): string {
    return resolveEventHref(this.event);
  }
}
