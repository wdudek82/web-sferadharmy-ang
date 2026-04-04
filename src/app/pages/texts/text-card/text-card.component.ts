import { AfterViewInit, Component, ElementRef, Input, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TextSummary } from '../texts-data';

@Component({
  selector: 'app-text-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './text-card.component.html',
  styleUrl: './text-card.component.scss',
})
export class TextCardComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) text!: TextSummary;
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
}
