@Component({
  selector: 'app-site-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './site-settings.html',
  styleUrl: './site-settings.scss',
})
export class SiteSettingsComponent implements OnInit {
  getColorHex(color: string): string {
    const found = this.colorOptions.find((opt) => opt.value === color);
    return found ? found.hex : '#ffffff';
  }
  private siteSettingsService = inject(SiteSettingsService);
  loading = signal(true);
  error = signal<string | null>(null);
  settings = signal<SiteSettings | null>(null);
  siteTitleParts = signal<{ text: string; color: string }[]>([]);
  colorOptions = COLOR_OPTIONS;

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.loading.set(true);
    this.error.set(null);
    this.siteSettingsService.getSiteSettings().subscribe({
      next: (settings) => {
        // Ensure at least one title part exists for editing, and never empty string for text
        if (
          !settings.siteTitleParts ||
          settings.siteTitleParts.length === 0 ||
          !settings.siteTitleParts[0].text
        ) {
          settings.siteTitleParts = [{ text: 'Site Title', color: COLOR_OPTIONS[0].value }];
        } else {
          settings.siteTitleParts = settings.siteTitleParts.map((part) => ({
            ...part,
            color: part.color || COLOR_OPTIONS[0].value,
          }));
        }
        this.settings.set(settings);
        this.siteTitleParts.set([...settings.siteTitleParts]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load settings');
        this.loading.set(false);
      },
    });
  }

  addTitlePart() {
    const parts = this.siteTitleParts();
    if (parts.length < 3) {
      this.siteTitleParts.set([...parts, { text: '', color: COLOR_OPTIONS[0].value }]);
      this.updateSettingsTitleParts();
    }
  }

  removeTitlePart() {
    const parts = this.siteTitleParts();
    if (parts.length > 1) {
      this.siteTitleParts.set(parts.slice(0, -1));
      this.updateSettingsTitleParts();
    }
  }

  // Keep for future use if needed, but not required for add/remove
  updateSettingsTitleParts() {
    const s = this.settings();
    if (s) {
      s.siteTitleParts = this.siteTitleParts();
      this.settings.set({ ...s });
    }
  }

  saveSettings() {
    const currentSettings = this.settings();
    if (!currentSettings) return;
    this.loading.set(true);
    this.siteSettingsService.updateSiteSettings(currentSettings).subscribe({
      next: (settings) => {
        this.settings.set(settings);
        this.siteTitleParts.set(settings.siteTitleParts || []);
        this.loading.set(false);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Failed to save settings');
        this.loading.set(false);
      },
    });
  }
}
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteSettingsService } from '../../services/site-settings';
import { SiteSettings } from '../../models/site-settings';

// Tailwind background color classes for select dropdown
export const COLOR_OPTIONS = [
  { value: 'bg-white', label: 'White', hex: '#ffffff' },
  { value: 'bg-gray-300', label: 'Gray', hex: '#d1d5db' },
  { value: 'bg-gray-500', label: 'Dark Gray', hex: '#6b7280' },
  { value: 'bg-red-400', label: 'Red', hex: '#f87171' },
  { value: 'bg-orange-400', label: 'Orange', hex: '#fb923c' },
  { value: 'bg-yellow-400', label: 'Yellow', hex: '#fde047' },
  { value: 'bg-green-400', label: 'Green', hex: '#4ade80' },
  { value: 'bg-teal-400', label: 'Teal', hex: '#2dd4bf' },
  { value: 'bg-cyan-400', label: 'Cyan', hex: '#22d3ee' },
  { value: 'bg-blue-400', label: 'Blue', hex: '#60a5fa' },
  { value: 'bg-indigo-400', label: 'Indigo', hex: '#818cf8' },
  { value: 'bg-purple-400', label: 'Purple', hex: '#a78bfa' },
  { value: 'bg-pink-400', label: 'Pink', hex: '#f472b6' },
  { value: 'bg-rose-400', label: 'Rose', hex: '#fb7185' },
  { value: 'bg-lime-400', label: 'Lime', hex: '#bef264' },
  { value: 'bg-emerald-400', label: 'Emerald', hex: '#34d399' },
];
