import { Component, ElementRef, Input } from '@angular/core';
import { NgOptimizedImage, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardBaseComponent } from '../../../shared/card-base';
import { resolveTextHref, TextSummary } from '../texts-data';

@Component({
  selector: 'app-text-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, SlicePipe],
  templateUrl: './text-card.component.html',
  styleUrl: './text-card.component.scss',
})
export class TextCardComponent extends CardBaseComponent {
  @Input({ required: true }) text!: TextSummary;

  constructor(hostRef: ElementRef<HTMLElement>) {
    super(hostRef);
  }

  protected get href(): string {
    return resolveTextHref(this.text);
  }
}
