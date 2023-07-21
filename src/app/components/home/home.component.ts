import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthSharedService } from 'src/app/services/auth-shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoggedin: boolean = false;
  constructor(
    private cookieService: CookieService,
    private authSharedService: AuthSharedService,
  ) { }
  ngOnInit() {
    this.isLoggedin = !!this.cookieService.get('token');
    this.authSharedService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedin = isLoggedIn;
    });

  }
}

