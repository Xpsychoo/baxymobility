import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { apiUrl } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class Converttobase64Service {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  encodeData(data: any) {
    return this.http.post(`${apiUrl}/TextFormatter/e64TextFormatter`, data);
  }
  decodeData(data: any) {
    return this.http.post(`${apiUrl}/TextFormatter/d64TextFormatter`, data);
  }
}
