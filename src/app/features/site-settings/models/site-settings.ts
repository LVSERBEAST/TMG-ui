export interface SiteSettings {
  siteName: string;
  siteTitleParts?: Array<{
    text: string;
    color: string; // Tailwind class, e.g. 'text-purple-400'
  }>;
  siteDescription: string;
  defaultAuthor: string;
  articlesPerPage: number;
  autoSaveInterval: number;
  maintenanceMode: boolean;
  maxFileSize: number;
  allowedFileTypes: string;
  googleAnalyticsId: string;
  enableSitemap: boolean;
  smtpServer: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  enableSsl: boolean;
  sessionTimeout: number;
  maxFailedLogins: number;
  cacheArticlesDuration: number;
  cachePagesDuration: number;
  enableOutputCaching: boolean;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
}
