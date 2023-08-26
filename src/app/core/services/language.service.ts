import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private selectedLanguageSubject = new BehaviorSubject<string>('en');
  public selectedLanguage$: Observable<string> = this.selectedLanguageSubject.asObservable();

  constructor() { }

  setLanguage(language: string): void {
    this.selectedLanguageSubject.next(language);
  }
}
