import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from 'src/app/utils/constants';
import { CookieService } from 'ngx-cookie-service';
import { getHttpOptions } from 'src/app/utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getUserLists() {
    return this.http.post(`${apiUrl}/login/DMSsel_subUsers_list`, null, getHttpOptions(this.cookieService));
  }

  addUser(data: any) {
    let userInfo = this.cookieService.get('userInfo')
    let userInfoData = JSON.parse(userInfo)
    const reqOptions = { ...data, Userid: userInfoData.userid }
    return this.http.post(`${apiUrl}/login/DMSsave_newSubDealer`, reqOptions, getHttpOptions(this.cookieService));
  }

  updateUser(data: any) {
    let userInfo = this.cookieService.get('userInfo')
    let userInfoData = JSON.parse(userInfo)
    const reqOptions = {
      ...data,
      Userid: userInfoData.userid,
      SecUserid: data.Secondary_Usercode,
    }
    return this.http.post(`${apiUrl}/login/DMSupdate_newSubDealer`, reqOptions, getHttpOptions(this.cookieService));
  }
}

