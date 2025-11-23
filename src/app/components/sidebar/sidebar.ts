import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface MenuItem {
  icon: string;
  label: string;
  url: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  collapsed = signal(false);
  private menuItemsArray: MenuItem[] = [
    { icon: 'dashboard', label: 'Lorem', url: 'dashboard' },
    { icon: 'info', label: 'Lorem', url: 'info' },
    { icon: 'cube', label: 'Lorem', url: 'cube' },
    { icon: 'maximize', label: 'Lorem', url: 'maximize' },
    { icon: 'plug', label: 'Lorem', url: 'plug' },
    { icon: 'file', label: 'Lorem', url: 'file' },
    { icon: 'layout', label: 'Lorem', url: 'layout' },
  ];
  private menuItemsBottomArray: MenuItem[] = [
    { icon: 'settings', label: 'Lorem', url: 'settings' },
    { icon: 'pop', label: 'Lorem', url: 'others' },
  ];
  private router = inject(Router);

  toggleSidebar() {
    this.collapsed.set(!this.collapsed());
  }
  isActive(url: string) {
    return this.router.url === url;
  }

  menuItems = signal<MenuItem[]>(this.menuItemsArray);
  menuItemsBottom = signal<MenuItem[]>(this.menuItemsBottomArray);
}
