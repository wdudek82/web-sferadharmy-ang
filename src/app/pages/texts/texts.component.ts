import { Component } from '@angular/core';
import { TextCardComponent } from './text-card/text-card.component';
import { textsData } from './texts-data';

@Component({
  selector: 'app-texts',
  standalone: true,
  imports: [TextCardComponent],
  templateUrl: './texts.component.html',
  styleUrl: './texts.component.scss'
})
export class TextsComponent {
  protected readonly texts = textsData;
}
