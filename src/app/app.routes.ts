import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ArticleComponent } from './pages/article/article.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EventsComponent } from './pages/events/events.component';
import { HomeComponent } from './pages/home/home.component';
import { TextsComponent } from './pages/texts/texts.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'o-nas', component: AboutComponent },
  { path: 'wydarzenia', component: EventsComponent },
  { path: 'teksty/:id', component: ArticleComponent },
  { path: 'teksty', component: TextsComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
