import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  constructor(private http: HttpClient) {}

  userlogin(data:any) {
    const apiUrl = `https://claimstoexcel.com/backend/api/users/login`;
    return this.http.post(apiUrl, data);
  }

  otpSubmitFunc(data:any) {
    const apiUrl = `https://claimstoexcel.com/backend/api/users/verify`;
    return this.http.post(apiUrl, data);
  } 
}
