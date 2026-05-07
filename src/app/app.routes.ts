import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ArticleComponent } from './pages/article/article.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EventsComponent } from './pages/events/events.component';
import { TextsComponent } from './pages/texts/texts.component';
import { EventComponent } from './pages/events/event/event.component';

export const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'o-nas', component: AboutComponent },
  { path: 'wydarzenia/:id', component: EventComponent },
  { path: 'wydarzenia', component: EventsComponent },
  { path: 'teksty/:id', component: ArticleComponent },
  { path: 'teksty', component: TextsComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
