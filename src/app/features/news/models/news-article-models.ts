export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
  author: string;
  summary?: string;
  tags: string[];
  category?: string;
  featuredImageUrl?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface CreateNewsArticleRequest {
  title: string;
  content: string;
  metaDescription?: string;
  author: string;
  summary?: string;
  category?: string;
  featuredImageUrl?: string;
  tags: string[];
}

export interface UpdateNewsArticleRequest {
  title: string;
  content: string;
  metaDescription?: string;
  author: string;
  summary?: string;
  category?: string;
  featuredImageUrl?: string;
  tags: string[];
}

export interface PageFilters {
  pageNumber?: number;
  pageSize?: number;
  isPublished?: boolean;
  searchTerm?: string;
}
