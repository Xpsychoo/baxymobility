import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthSharedService } from 'src/app/services/auth-shared-service.service';
import { SidebarServiceService } from 'src/app/services/sidebar/sidebar-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isSidebarOpen = false;
  userInfoData: any;

  constructor(
    private cookieService: CookieService,
    private toastr: ToastrService,
    private router: Router,
    private authSharedService: AuthSharedService,
    private sidebarService: SidebarServiceService
  ) { 
    this.sidebarService.sidebarState$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    }); 
  }

  isLoggedin: boolean = false
  confirmBox: boolean = false

  ngOnInit() {
    this.isLoggedin = !!this.cookieService.get('token');
    this.authSharedService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedin = isLoggedIn;
      this.updateUserInfoData();
    });
    this.updateUserInfoData();
  }

  updateUserInfoData() {
    if (this.cookieService.get('userInfo')) {
      this.userInfoData = JSON.parse(this.cookieService.get('userInfo'));
    } 
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

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();   
  }
}
