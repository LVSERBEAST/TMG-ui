import { Injectable, signal } from '@angular/core';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class Notifications {
  private notifications = signal<Notification[]>([]);
  private notificationCounter = 0;

  getNotifications = this.notifications.asReadonly();

  showSuccess(message: string, duration = 3000): void {
    this.addNotification(message, 'success', duration);
  }

  showError(message: string, duration = 5000): void {
    this.addNotification(message, 'error', duration);
  }

  showWarning(message: string, duration = 4000): void {
    this.addNotification(message, 'warning', duration);
  }

  showInfo(message: string, duration = 3000): void {
    this.addNotification(message, 'info', duration);
  }

  remove(id: string): void {
    this.notifications.update((notifications) => notifications.filter((n) => n.id !== id));
  }

  clear(): void {
    this.notifications.set([]);
  }

  private addNotification(message: string, type: Notification['type'], duration: number): void {
    const id = `notification-${++this.notificationCounter}`;
    const notification: Notification = {
      id,
      message,
      type,
      duration,
    };

    this.notifications.update((notifications) => [...notifications, notification]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }
}
