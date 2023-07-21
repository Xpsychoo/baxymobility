import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSharedService {
  private isLoggedInSubject = new Subject<boolean>();

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }
}
