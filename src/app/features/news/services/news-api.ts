import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../core/services/base-api';
import { PaginatedResponse } from '../../../shared/models/api-models';
import {
  NewsArticle,
  CreateNewsArticleRequest,
  UpdateNewsArticleRequest,
  PageFilters,
} from '../models/news-article-models';

@Injectable({
  providedIn: 'root',
})
export class NewsApi extends BaseApiService {
  getArticles(filters?: PageFilters): Observable<PaginatedResponse<NewsArticle>> {
    const params = filters ? this.buildHttpParams(filters) : undefined;
    return this.get<PaginatedResponse<NewsArticle>>('/news-articles', params);
  }

  getArticleById(id: number): Observable<NewsArticle> {
    return this.get<NewsArticle>(`/news-articles/${id}`);
  }

  createArticle(request: CreateNewsArticleRequest): Observable<{ id: number }> {
    return this.post<{ id: number }>('/news-articles', request);
  }

  updateArticle(id: number, request: UpdateNewsArticleRequest): Observable<void> {
    return this.put<void>(`/news-articles/${id}`, request);
  }

  deleteArticle(id: number): Observable<void> {
    return this.delete<void>(`/news-articles/${id}`);
  }

  publishArticle(id: number): Observable<{ message: string }> {
    return this.post<{ message: string }>(`/news-articles/${id}/publish`, {});
  }

  unpublishArticle(id: number): Observable<{ message: string }> {
    return this.post<{ message: string }>(`/news-articles/${id}/unpublish`, {});
  }
}
