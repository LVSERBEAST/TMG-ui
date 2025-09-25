import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NewsApi } from './services/news-api';
import { NewsArticle, PageFilters } from './models/news-article-models';
import { PaginatedResponse } from '../../shared/models/api-models';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News implements OnInit {
  private newsApi = inject(NewsApi);
  private router = inject(Router);

  articles = signal<NewsArticle[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  totalCount = signal(0);
  hasPreviousPage = computed(() => this.currentPage() > 1);
  hasNextPage = computed(() => this.currentPage() < this.totalPages());
  showPagination = computed(() => this.totalPages() > 1);
  showEmptyState = computed(() => !this.loading() && !this.error() && this.articles().length === 0);

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles(page: number = 1) {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage.set(page);

    const filters: PageFilters = {
      pageNumber: page,
      pageSize: this.pageSize(),
      isPublished: true,
    };

    this.newsApi.getArticles(filters).subscribe({
      next: (response: PaginatedResponse<NewsArticle>) => {
        this.articles.set(response.data);
        this.totalPages.set(response.totalPages);
        this.totalCount.set(response.totalCount);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load articles');
        this.loading.set(false);
        console.error('Error loading articles:', error);
      },
    });
  }

  navigateToArticle(id: number) {
    this.router.navigate(['/news', id]);
  }

  onPreviousPage() {
    if (this.hasPreviousPage()) {
      this.loadArticles(this.currentPage() - 1);
    }
  }

  onNextPage() {
    if (this.hasNextPage()) {
      this.loadArticles(this.currentPage() + 1);
    }
  }

  retryLoad() {
    this.loadArticles(this.currentPage());
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
