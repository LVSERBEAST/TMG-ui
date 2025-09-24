export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  isPublished: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface CreateNewsArticleRequest {
  title: string;
  slug: string;
  content: string;
  metaDescription?: string;
}

export interface UpdateNewsArticleRequest extends CreateNewsArticleRequest {
  isPublished: boolean;
}

// export interface PageFilters {
//   pageNumber?: number;
//   pageSize?: number;
//   isPublished?: boolean;
//   searchTerm?: string;
// }
