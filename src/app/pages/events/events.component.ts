import { Component } from '@angular/core';
import { EventCardComponent } from './event-card/event-card.component';
import { eventsData } from './event-data';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  protected readonly events = eventsData;
}
