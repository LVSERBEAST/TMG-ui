import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { News } from './features/news/news';
import { Admin } from './features/admin/admin';
import { AdminNews } from './features/admin/components/admin-news/admin-news';
import { NewsArticleDetail } from './features/news/components/news-article-detail/news-article-detail';
import { About } from './features/about/about';
import { Contact } from './features/contact/contact';
import { FAQ } from './features/faq/faq';
import { Careers } from './features/careers/careers';
import { PrivacyPolicy } from './features/privacy-policy/privacy-policy';
import { Support } from './features/support/support';
import { TermsOfService } from './features/terms-of-service/terms-of-service';
import { Blog } from './features/blog/blog';
import { Sitemap } from './features/sitemap/sitemap';
import { SiteSettingsComponent } from './features/site-settings/components/site-settings/site-settings';

export const routes: Routes = [
  { path: '', component: Home },
  // HEADER
  { path: 'news', component: News },
  { path: 'news/:id', component: NewsArticleDetail },
  { path: 'blog', component: Blog },
  { path: 'faq', component: FAQ },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  // FOOTER
  { path: 'support', component: Support },
  { path: 'careers', component: Careers },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-of-service', component: TermsOfService },
  { path: 'sitemap', component: Sitemap },
  // ADMIN
  { path: 'admin', component: Admin },
  { path: 'admin/news', component: AdminNews },
  { path: 'admin/site-settings', component: SiteSettingsComponent },
  { path: '**', redirectTo: '' },
];
