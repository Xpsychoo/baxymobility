import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../utils/constants'
import { getHttpOptions } from '../utils/http-utils';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }
  userlogin(data: any) {
    return this.http.post(`${apiUrl}/login/DMSLoginCheck`, data);
  }

  otpSubmitFunc(data: any) {
    const apiUrl = `https://claimstoexcel.com/backend/api/users/verify`;
    return this.http.post(apiUrl, data);
  }
  changePassword(data: any) {
    return this.http.post(`${apiUrl}/login/DMSloginpwdchange`, data, getHttpOptions(this.cookieService));
  }
}
