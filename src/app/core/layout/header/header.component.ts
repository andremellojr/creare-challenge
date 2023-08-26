import { Component, Input } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { LanguageService } from '../../services/language.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() selectedLanguage = 'en';
  supportedLanguages = [
    { code: 'ar', name: 'العربية' },
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'es-419', name: 'Español (Latinoamérica)' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'pl', name: 'Polski' },
    { code: 'pt-BR', name: 'Português (Brasil)' },
    { code: 'ru', name: 'Русский' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'zh-CN', name: '简体中文' },
    { code: 'zh-Hant', name: '繁體中文' }
  ];

  constructor(
    private darkModeService: DarkModeService,
    private languageService: LanguageService,
    private loadingService: LoadingService
  ) {}

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  onLanguageChange(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.loadingService.setLoading(true);
    localStorage.setItem('selectedLanguage', selectedLanguage);
    this.languageService.setLanguage(selectedLanguage);
  }
}
