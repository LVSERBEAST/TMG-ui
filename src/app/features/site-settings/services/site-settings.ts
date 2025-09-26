import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { signal } from '@angular/core';
import { BaseApiService } from '../../../core/services/base-api';
import { SiteSettings } from '../models/site-settings';

@Injectable({
  providedIn: 'root',
})
export class SiteSettingsService extends BaseApiService {
  endpoint = '/site-settings';
  settingsSubject = new BehaviorSubject<SiteSettings | null>(null);
  settings$ = this.settingsSubject.asObservable();

  loadSettings() {
    this.get<SiteSettings>(this.endpoint).subscribe({
      next: (settings) => this.settingsSubject.next(settings),
      error: () => this.settingsSubject.next(null),
    });
  }

  getSiteSettings(): Observable<SiteSettings> {
    return this.get<SiteSettings>(this.endpoint);
  }

  updateSiteSettings(settings: Partial<SiteSettings>): Observable<SiteSettings> {
    return this.put<SiteSettings>(this.endpoint, settings);
  }
}
