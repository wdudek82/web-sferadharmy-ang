import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TextSummary } from '../texts-data';

@Component({
  selector: 'app-text-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './text-card.component.html',
  styleUrl: './text-card.component.scss'
})
export class TextCardComponent {
  @Input({ required: true }) text!: TextSummary;
}
