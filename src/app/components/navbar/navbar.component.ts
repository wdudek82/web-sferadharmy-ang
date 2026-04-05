import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';

type ThemeOption = {
  id: 'sunset' | 'redwood' | 'forest' | 'classic-neutral' | 'dreamy-pastel';
  label: string;
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly themes: ThemeOption[] = [
    { id: 'sunset', label: 'Sunset' },
    { id: 'redwood', label: 'Redwood' },
    { id: 'forest', label: 'Forest' },
    { id: 'classic-neutral', label: 'Classic Neutral' },
    { id: 'dreamy-pastel', label: 'Dreamy Pastel' },
  ];

  protected readonly menuOpen = signal(false);
  protected readonly themeMenuOpen = signal(false);
  protected readonly currentTheme = signal<ThemeOption>(this.themes[1]);
  protected readonly themeSelectorEnabled = environment.themeSelectorEnabled;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = window.localStorage.getItem('theme');
      const initial =
        this.themes.find((theme) => theme.id === saved) ??
        this.themes.find((theme) => theme.id === document.documentElement.dataset['theme']) ??
        this.themes[1];
      this.setTheme(initial);
    }
  }

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  toggleThemeMenu() {
    this.themeMenuOpen.update((open) => !open);
  }

  setTheme(theme: ThemeOption) {
    this.currentTheme.set(theme);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.dataset['theme'] = theme.id;
      window.localStorage.setItem('theme', theme.id);
    }
    this.themeMenuOpen.set(false);
  }

  get themeOptions() {
    return this.themes;
  }

  @HostListener('document:click', ['$event'])
  closeThemeMenu(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (!target || !target.closest('.theme-picker')) {
      this.themeMenuOpen.set(false);
    }
  }
}
