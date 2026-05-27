import { AfterViewInit, Directive, ElementRef, OnDestroy, signal } from '@angular/core';

/**
 * Shared base for card components that lazy-reveal via IntersectionObserver.
 * Subclasses provide their own @Input() and href getter.
 */
@Directive()
export abstract class CardBaseComponent implements AfterViewInit, OnDestroy {
  protected readonly isVisible = signal(false);
  private observer?: IntersectionObserver;

  constructor(private hostRef: ElementRef<HTMLElement>) {}

  /** Subclasses implement: returns the router link for the card. */
  protected abstract get href(): string;

  ngAfterViewInit(): void {
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

    this.observer.observe(this.hostRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
