// app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { News } from './features/news/news';
import { Admin } from './features/admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'news', component: News },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' },
];
