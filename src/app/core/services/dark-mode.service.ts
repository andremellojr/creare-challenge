import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(true);
  public darkMode$ = this.darkModeSubject.asObservable();

  constructor() { }

  toggleDarkMode(): void {
    this.darkModeSubject.next(!this.darkModeSubject.value);
  }
}
