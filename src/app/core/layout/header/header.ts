import { Component, signal, HostListener, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SiteSettingsService } from '../../../features/site-settings/services/site-settings';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showDropdown = signal(false);
  showMobileMenu = signal(false);
  siteName = signal('The Money Gigs');
  siteTitleParts = signal<{ text: string; color: string }[]>([]);

  constructor() {
    const siteSettingsService = inject(SiteSettingsService);
    siteSettingsService.settings$.pipe(takeUntilDestroyed()).subscribe((settings) => {
      if (settings?.siteName) {
        this.siteName.set(settings.siteName);
      }
      if (settings?.siteTitleParts && settings.siteTitleParts.length > 0) {
        this.siteTitleParts.set(settings.siteTitleParts);
      } else {
        this.siteTitleParts.set([]);
      }
    });
  }

  toggleDropdown() {
    this.showDropdown.set(!this.showDropdown());
    this.showMobileMenu.set(false);
  }

  closeDropdown() {
    this.showDropdown.set(false);
  }

  toggleMobileMenu() {
    this.showMobileMenu.set(!this.showMobileMenu());
    this.showDropdown.set(false);
  }

  closeMobileMenu() {
    this.showMobileMenu.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.closeDropdown();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1024) {
      this.closeMobileMenu();
    }
  }
}
