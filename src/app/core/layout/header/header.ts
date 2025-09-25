import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {
  showDropdown = signal(false);
  showMobileMenu = signal(false);

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
    // Close mobile menu when resizing to desktop
    if (window.innerWidth >= 1024) {
      this.closeMobileMenu();
    }
  }
}
