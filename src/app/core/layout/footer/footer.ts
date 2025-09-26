import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SiteSettingsService } from '../../../features/site-settings/services/site-settings';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();
  siteName = signal('TMG');

  constructor() {
    const siteSettingsService = inject(SiteSettingsService);
    siteSettingsService.settings$.pipe(takeUntilDestroyed()).subscribe((settings) => {
      if (settings?.siteName) {
        this.siteName.set(settings.siteName);
      }
    });
  }
}
