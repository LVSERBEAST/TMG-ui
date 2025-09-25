import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { News } from './features/news/news';
import { Admin } from './features/admin/admin';
import { AdminNews } from './features/admin/components/admin-news/admin-news';
import { NewsArticleDetail } from './features/news/components/news-article-detail/news-article-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'news', component: News },
  { path: 'news/:id', component: NewsArticleDetail },
  { path: 'admin', component: Admin },
  { path: 'admin/news', component: AdminNews },
  { path: '**', redirectTo: '' },
];
