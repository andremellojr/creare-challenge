import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class FortniteApiService {

  private apiUrl = 'https://fortnite-api.com/v2';

  private battleRoyaleNewsSubject = new BehaviorSubject<any>(null);
  battleRoyaleNews$ = this.battleRoyaleNewsSubject.asObservable();

  private shopDataSubject = new BehaviorSubject<any>(null);
  shopData$ = this.shopDataSubject.asObservable();

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  getBattleRoyaleNews(): Observable<any> {
    return this.languageService.selectedLanguage$.pipe(
      switchMap(selectedLanguage => {
        return this.http.get(`${this.apiUrl}/news/br?language=${selectedLanguage}`).pipe(
          tap(news => {
            this.battleRoyaleNewsSubject.next(news);
          })
        );
      })
    );
  }

  getShopData(): Observable<any> {
    return this.languageService.selectedLanguage$.pipe(
      switchMap(selectedLanguage => {
        return this.http.get(`${this.apiUrl}/shop/br?language=${selectedLanguage}`).pipe(
          tap(shopData => {
            this.shopDataSubject.next(shopData);
          })
        );
      })
    );
  }
}
