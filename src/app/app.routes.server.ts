import { RenderMode, ServerRoute } from '@angular/ssr';
import { textsData } from './pages/texts/texts-data';

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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
