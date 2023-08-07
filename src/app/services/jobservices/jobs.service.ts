import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { apiUrl } from 'src/app/utils/constants';
import { getHttpOptions } from 'src/app/utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getjobDatabyChasis(data: any) {
    return this.http.post(`${apiUrl}/ServiceJob/DMSGet_OldUpdatedJobDetails`, data, getHttpOptions(this.cookieService));
  }
  getjobRequestList(data: any) {
    return this.http.post(`${apiUrl}/ServiceJob/DMSsel_Job_Request_List`, data, getHttpOptions(this.cookieService));
  }

  getSparePartLabourList(data: any) {
    return this.http.post(`${apiUrl}/ServiceJob/DMSsel_SparePart_Labour_Item_List`, data, getHttpOptions(this.cookieService));
  }

  getSparePartLabourItemDetail(data: any) {
    return this.http.post(`${apiUrl}/ServiceJob/DMSsel_SparePart_Labour_Item_List_Details`, data, getHttpOptions(this.cookieService));
  }

  saveJobRequest(data: any) {
    return this.http.post(`${apiUrl}/ServiceJob/DMSSaveJobRequest`, data, getHttpOptions(this.cookieService));
  }
  updateJobRequest(data: any) {
    return this.http.post(`${apiUrl}/ServiceJob/DMSUpdateJobRequest`, data, getHttpOptions(this.cookieService));
  }

}
