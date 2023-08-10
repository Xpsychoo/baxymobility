import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthSharedService } from '../services/auth-shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthSharedService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) { }

  canActivate(): boolean {
    const hasToken = this.cookieService.get('token');
    const isTokenValid = this.verifyToken(hasToken)

    if (hasToken && isTokenValid) {
      return true;
    } else {
      this.authService.setIsLoggedIn(false);
      this.router.navigateByUrl('/');
      this.toastr.info('Please Login to Continue');
      this.cookieService.delete('token');
      this.cookieService.delete('userInfo');
      return false;
    }
  }

  verifyToken(base64Token: string): boolean {
    try {
      const token = atob(base64Token);
      const [year, month, day] = token.split('-');
      const tokenDate = new Date(`${year}-${month}-${day}`);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (tokenDate.getTime() === currentDate.getTime()) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
