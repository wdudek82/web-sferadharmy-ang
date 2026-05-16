import { RenderMode, ServerRoute } from '@angular/ssr';
import { textsData } from './pages/texts/texts-data';
import { eventsData } from './pages/events/event-data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'teksty/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      textsData.map((text) => ({
        id: text.id,
      })),
  },
  {
    path: 'wydarzenia/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      eventsData.map((event) => ({
        id: event.id,
      })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
