import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsApi } from '../news/services/news-api';
import { NewsArticle, PageFilters } from '../news/models/news-article-models';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  private newsApi = inject(NewsApi);

  // Dashboard stats
  totalArticles = signal(0);
  publishedArticles = signal(0);
  draftArticles = signal(0);
  recentArticles = signal<NewsArticle[]>([]);
  loading = signal(true);

  // Computed properties
  publishedPercentage = computed(() => {
    const total = this.totalArticles();
    return total > 0 ? Math.round((this.publishedArticles() / total) * 100) : 0;
  });

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.loading.set(true);

    // Load recent articles for dashboard preview
    const recentFilters: PageFilters = {
      pageNumber: 1,
      pageSize: 5,
    };

    this.newsApi.getArticles(recentFilters).subscribe({
      next: (response) => {
        this.totalArticles.set(response.totalCount);
        this.recentArticles.set(response.data);

        // Calculate published vs draft counts
        const published = response.data.filter((a) => a.isPublished).length;
        this.publishedArticles.set(published);
        this.draftArticles.set(response.data.length - published);

        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.loading.set(false);
      },
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
