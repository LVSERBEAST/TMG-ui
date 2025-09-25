import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NewsApi } from './../../services/news-api';
import { NewsArticle } from './../../models/news-article-models';

@Component({
  selector: 'app-news-article-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './news-article-detail.html',
  styleUrl: './news-article-detail.scss',
})
export class NewsArticleDetail implements OnInit {
  private newsApi = inject(NewsApi);
  private route = inject(ActivatedRoute);

  article = signal<NewsArticle | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArticle(parseInt(id, 10));
    } else {
      this.error.set('Invalid article ID');
      this.loading.set(false);
    }
  }

  private loadArticle(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.newsApi.getArticleById(id).subscribe({
      next: (article: NewsArticle) => {
        this.article.set(article);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Article not found');
        this.loading.set(false);
        console.error('Error loading article:', error);
      },
    });
  }

  formatDate(dateString?: string): string {
    return dateString ? new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) : '';
  }

  retryLoad() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArticle(parseInt(id, 10));
    }
  }
}
