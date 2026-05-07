import { AfterViewInit, Component, ElementRef, Input, OnDestroy, signal } from '@angular/core';
import { NgOptimizedImage, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { resolveEventHref, EventSummary } from '../event-data';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, SlicePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) event!: EventSummary;
  protected readonly isVisible = signal(false);
  private observer?: IntersectionObserver;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible.set(true);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  protected get href(): string {
    return resolveEventHref(this.event);
  }
}
