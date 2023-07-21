import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthSharedService } from './services/auth-shared-service.service';
import { SidebarServiceService } from './services/sidebar/sidebar-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedin: boolean = false;
  isSidebarOpen: boolean = false;
  constructor(
    private cookieService: CookieService,
    private authSharedService: AuthSharedService,
    private sidebarService: SidebarServiceService,
  ) { }



  ngOnInit() {
    this.isLoggedin = !!this.cookieService.get('token');
    this.authSharedService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedin = isLoggedIn;
    });

    this.sidebarService.sidebarState$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
  
}
