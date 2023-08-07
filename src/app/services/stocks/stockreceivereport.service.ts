import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { apiUrl } from 'src/app/utils/constants';
import { getHttpOptions } from 'src/app/utils/http-utils';

@Injectable({
  providedIn: 'root'
})
export class StockreceivereportService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getstockreceiveReport(data: any) {
    return this.http.post(`${apiUrl}/StockReceiving/DMS_StockReceiving_rpt`, data, getHttpOptions(this.cookieService));
  }

  getInvoiceItemDetails(data: any) {
    return this.http.post(`${apiUrl}/ViewInvoice/DMSViewDealerInvoiceItemDetails`, data, getHttpOptions(this.cookieService));
  }

  updatedstockreceiveList(data: any) {
    return this.http.post(`${apiUrl}/StockReceiving/DMSSel_UpdateStockReceivingStatus_List`, data, getHttpOptions(this.cookieService));
  }

  updatedstockreceiveDetail(data: any) {
    return this.http.post(`${apiUrl}/RetailPunch/DMSUpdate_StockReceiving_Details`, data, getHttpOptions(this.cookieService));
  }

  getstockreceiveReportStatus() {
    return this.http.post(`${apiUrl}/StockReceiving/DMSSel_Receiving_Status`, null, getHttpOptions(this.cookieService));
  }

  getdealersList() {
    return this.http.post(`${apiUrl}/StockReceiving/DMSSel_Dealer_List`, null, getHttpOptions(this.cookieService));
  }

  getTransitList(data:any) {
    return this.http.post(`${apiUrl}/ViewInvoice/DMSViewDealerInvoice`, data, getHttpOptions(this.cookieService));
  }

  getTransitListItem(data:any) {
    return this.http.post(`${apiUrl}/StockReceiving/DMSViewInvoiceReceiving`, data, getHttpOptions(this.cookieService));
  }

  updateTransitListItem(data:any) {
    return this.http.post(`${apiUrl}/StockReceiving/DMSSaveInvoiceReceiving`, data, getHttpOptions(this.cookieService));
  }
}
