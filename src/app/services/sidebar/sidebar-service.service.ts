import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {

  private sidebarStateSubject = new BehaviorSubject<boolean>(true);
  public sidebarState$ = this.sidebarStateSubject.asObservable();

  toggleSidebar(): void {
    this.sidebarStateSubject.next(!this.sidebarStateSubject.getValue());
  }
}
