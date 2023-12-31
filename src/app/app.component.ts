import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { DarkModeService } from './core/services/dark-mode.service';
import { Subscription } from 'rxjs';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  isDarkMode: boolean = false;
  loadingSubscription: Subscription | undefined;
  darkModeSubscription: Subscription | undefined;
  selectedLanguage = 'en';

  constructor(
    private loadingService: LoadingService,
    private languageService: LanguageService,
    private darkModeService: DarkModeService,
    private detector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
      this.detector.detectChanges();
    });

    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe(darkMode => {
      this.isDarkMode = darkMode;

      if (darkMode) {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    });

    this.selectedLanguage = localStorage.getItem('selectedLanguage') || this.selectedLanguage;
    this.languageService.setLanguage(this.selectedLanguage);
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
     
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }
}
