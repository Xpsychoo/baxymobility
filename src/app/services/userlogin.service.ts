import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  forgotpassword(data: any) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Userid': data.userid,
        'Key': '123456',
      })
    }
    return this.http.post(`${apiUrl}/login/DMSCreateOtpLoginforget`, data, header);
  }

  changePassword(data: any) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Userid': data.userid,
        'Key': data.oldPassword,
      })
    }
    const reqOptions = { userid: data.userid, pass: data.pass }
    return this.http.post(`${apiUrl}/login/DMSloginpwdchange`, reqOptions, header);
  }

  resetPassword(data: any) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Userid': data.userid,
        'Key': '123456',
      })
    }
    return this.http.post(`${apiUrl}/login/DMSemploginpwdchangeforlogin`, data, header);
  }
}
