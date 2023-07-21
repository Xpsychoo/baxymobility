import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthSharedService } from 'src/app/services/auth-shared-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private cookieService: CookieService,
    private toastr: ToastrService,
    private router: Router,
    private authSharedService: AuthSharedService
  ) { }

  isLoggedin: boolean = false
  confirmBox: boolean = false

  ngOnInit() {
    this.isLoggedin = !!this.cookieService.get('token');
    this.authSharedService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedin = isLoggedIn;
    });
  }

  setConfirmBox(value: boolean) {
    this.confirmBox = value;
  }

  LogoutFunc() {
    this.cookieService.delete('token');
    this.cookieService.delete('userInfo');
    this.toastr.success('Logged out successfully');
    this.router.navigate(['/']);
    this.authSharedService.setIsLoggedIn(false);
    this.confirmBox = false;
  }
}
