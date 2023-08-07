import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {
  private userAddedSource = new Subject<void>();
  private obj: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  userAdded$ = this.userAddedSource.asObservable();

  triggerUserAdded() {
    this.userAddedSource.next();
  }

  setObj(object: any) {
    this.obj.next(object);
  }

  GetObj(): BehaviorSubject<any> {
    return this.obj; 
  }
}
