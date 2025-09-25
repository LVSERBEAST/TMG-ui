import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NewsApi } from '../../../news/services/news-api';
import {
  NewsArticle,
  CreateNewsArticleRequest,
  UpdateNewsArticleRequest,
  PageFilters,
} from '../../../news/models/news-article-models';
import { PaginatedResponse } from '../../../../shared/models/api-models';

@Component({
  selector: 'app-admin-news',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-news.html',
  styleUrl: './admin-news.scss',
})
export class AdminNews implements OnInit {
  private newsApi = inject(NewsApi);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  articles = signal<NewsArticle[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Pagination signals
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  totalCount = signal(0);

  // Modal states
  showCreateModal = signal(false);
  showEditModal = signal(false);
  editingArticle = signal<NewsArticle | null>(null);

  // Forms
  createForm!: FormGroup;
  editForm!: FormGroup;

  // Computed properties
  hasPreviousPage = computed(() => this.currentPage() > 1);
  hasNextPage = computed(() => this.currentPage() < this.totalPages());
  showPagination = computed(() => this.totalPages() > 1);

  ngOnInit() {
    this.initializeForms();
    this.loadArticles();
  }

  initializeForms() {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      content: ['', [Validators.required, Validators.maxLength(10000)]],
      metaDescription: ['', [Validators.maxLength(160)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      summary: ['', [Validators.maxLength(500)]],
      category: ['', [Validators.maxLength(50)]],
      featuredImageUrl: ['', [Validators.maxLength(500)]],
      tags: [''],
    });

    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      content: ['', [Validators.required, Validators.maxLength(10000)]],
      metaDescription: ['', [Validators.maxLength(160)]],
      author: ['', [Validators.required, Validators.maxLength(100)]],
      summary: ['', [Validators.maxLength(500)]],
      category: ['', [Validators.maxLength(50)]],
      featuredImageUrl: ['', [Validators.maxLength(500)]],
      tags: [''],
    });
  }

  loadArticles(page: number = 1) {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage.set(page);

    const filters: PageFilters = {
      pageNumber: page,
      pageSize: this.pageSize(),
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

  // Modal controls
  openCreateModal() {
    this.showCreateModal.set(true);
    this.createForm.reset();
  }

  closeCreateModal() {
    this.showCreateModal.set(false);
  }

  openEditModal(article: NewsArticle) {
    this.editingArticle.set(article);
    this.showEditModal.set(true);

    this.editForm.patchValue({
      title: article.title,
      content: article.content,
      metaDescription: article.metaDescription,
      author: article.author,
      summary: article.summary,
      category: article.category,
      featuredImageUrl: article.featuredImageUrl,
      tags: article.tags.join(', '),
    });
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.editingArticle.set(null);
  }

  onCreateArticle() {
    if (this.createForm.valid) {
      const formValue = this.createForm.value;
      const request: CreateNewsArticleRequest = {
        ...formValue,
        tags: this.parseTagsString(formValue.tags),
      };

      this.newsApi.createArticle(request).subscribe({
        next: () => {
          this.closeCreateModal();
          this.loadArticles();
        },
        error: (error) => {
          console.error('Error creating article:', error);
          this.error.set('Failed to create article');
        },
      });
    }
  }

  onUpdateArticle() {
    if (this.editForm.valid && this.editingArticle()) {
      const formValue = this.editForm.value;
      const request: UpdateNewsArticleRequest = {
        ...formValue,
        tags: this.parseTagsString(formValue.tags),
      };

      this.newsApi.updateArticle(this.editingArticle()!.id, request).subscribe({
        next: () => {
          this.closeEditModal();
          this.loadArticles();
        },
        error: (error) => {
          console.error('Error updating article:', error);
          this.error.set('Failed to update article');
        },
      });
    }
  }

  onDeleteArticle(article: NewsArticle) {
    if (confirm(`Are you sure you want to delete "${article.title}"?`)) {
      this.newsApi.deleteArticle(article.id).subscribe({
        next: () => {
          this.loadArticles();
        },
        error: (error) => {
          console.error('Error deleting article:', error);
          this.error.set('Failed to delete article');
        },
      });
    }
  }

  onPublishArticle(article: NewsArticle) {
    this.newsApi.publishArticle(article.id).subscribe({
      next: () => {
        this.loadArticles();
      },
      error: (error) => {
        console.error('Error publishing article:', error);
        this.error.set('Failed to publish article');
      },
    });
  }

  onUnpublishArticle(article: NewsArticle) {
    this.newsApi.unpublishArticle(article.id).subscribe({
      next: () => {
        this.loadArticles();
      },
      error: (error) => {
        console.error('Error unpublishing article:', error);
        this.error.set('Failed to unpublish article');
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

  private parseTagsString(tagsString: string): string[] {
    return tagsString
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  dismissError() {
    this.error.set(null);
  }
}
