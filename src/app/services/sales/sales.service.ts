import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SWRetailPunchForm, bookingreportSearchForm, chassieform, retailPunchSearch, salesBookingRequest, validateChassis } from 'src/app/interfaces/sales.interface';
import { apiUrl } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  URL: string = apiUrl
  constructor(
    private http : HttpClient,
    private cookieService: CookieService
  ) { }


  private getHttpOptions() {
    const userInfo = this.cookieService.get('userInfo');
    const userInfoData = JSON.parse(userInfo);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Userid': userInfoData.userid,
      'Key': userInfoData.key,
    });

    return { userInfoData, headers };
  }
 // sales booking report page
  serachBookingReport(serachForm: bookingreportSearchForm){

    const { userInfoData, headers} = this.getHttpOptions();
    let searchData = {...serachForm} // deepCopy
    searchData.userid = userInfoData.userid
    searchData.Bookingformdate = searchData.Bookingformdate == ""? "":  this.convertmmDDYYYY(searchData.Bookingformdate)
    searchData.Bookingtodate = searchData.Bookingformdate == ""? "":   this.convertmmDDYYYY(searchData.Bookingtodate)

    return this.http.post(apiUrl+'/Booking/DMSSel_BookingReport', searchData , {headers})
  }

  // search booking report and in sale for search previous request
  serachRetailPunchReport(serachForm: retailPunchSearch){
    const { userInfoData, headers} = this.getHttpOptions();
    let searchData = {...serachForm}
    searchData.UserId = userInfoData.userid
    searchData.formdate = searchData.formdate == ""? "":  this.convertmmDDYYYY(searchData.formdate)
    searchData.todate = searchData.todate == ""? "" : this.convertmmDDYYYY(searchData.todate)

    return this.http.post(apiUrl+'/RetailPunch/DMS_RetailPunch_rpt', searchData , {headers})
  }

  // convrt yyyy-mm-dd --> mm/dd/yyyy
  convertmmDDYYYY(date: string){
    const currentDate = date.split('-')[1]+"/"+date.split('-')[2]+"/"+date.split('-')[0]
    return currentDate
  }


   // sales booking page
  saveDMSAPI(salesBookingRequestData: salesBookingRequest, add: boolean ){
    
    const { userInfoData, headers} = this.getHttpOptions();
    let formdata = {...salesBookingRequestData}
    formdata.CreateBy = userInfoData.userid
    formdata.DeliveryDate = formdata.DeliveryDate == "" || formdata.DeliveryDate == null? "":  this.convertmmDDYYYY(formdata.DeliveryDate)
    formdata.CIBILDoneDate = formdata.CIBILDoneDate == "" || formdata.CIBILDoneDate == null? "" : this.convertmmDDYYYY(formdata.CIBILDoneDate)
    formdata.FIDoneDate = formdata.FIDoneDate == "" || formdata.FIDoneDate == null ? "" : this.convertmmDDYYYY(formdata.FIDoneDate)
    formdata.FILoginDate = formdata.FILoginDate == "" || formdata.FILoginDate == null? "" : this.convertmmDDYYYY(formdata.FILoginDate)
    formdata.FileLoginDate = formdata.FileLoginDate == "" || formdata.FileLoginDate == null? "" : this.convertmmDDYYYY(formdata.FILoginDate)
    formdata.DOReceivedDate = formdata.DOReceivedDate == "" || formdata.DOReceivedDate == null? "" : this.convertmmDDYYYY(formdata.DOReceivedDate)
    formdata.PaymentExpectedDate = formdata.PaymentExpectedDate == "" || formdata.PaymentExpectedDate == null? "" : this.convertmmDDYYYY(formdata.PaymentExpectedDate)
    formdata.PaymentRCVDDate = formdata.PaymentRCVDDate == "" || formdata.PaymentRCVDDate == null? "" : this.convertmmDDYYYY(formdata.PaymentRCVDDate)

    if(add){
      return this.http.post(apiUrl+'/Booking/DMSSave_BookingRequest', formdata , {headers})
    }else{   
      return this.http.post(apiUrl+'/Booking/DMSupdate_BookingRequest', formdata , {headers})

    }
  }

 // sales booking page
  getmodelListAPI(){
    const {headers} = this.getHttpOptions();
    return this.http.post(apiUrl+'/Booking/DMSsel_ModelName', {} , {headers})
  }

  // sales booking page
  getONeBookingDetail(bookingID: number){
    const {headers} = this.getHttpOptions();
    return this.http.post(apiUrl+'/Booking/DMSSel_BookingDetailsByID', {BookingID: bookingID} , {headers})
  }


  // retial puch page
  getStateList(){
    const {headers} = this.getHttpOptions();
    return this.http.post(apiUrl+'/RetailPunch/DMSSel_StateMaster', {} , {headers})
  }


  //retailpunch page  ---> validate report punch 
  validatePunchReport(data: validateChassis){
    const {userInfoData, headers} = this.getHttpOptions();
    data['UserId'] = userInfoData.userid
    data.userid = userInfoData.userid

    return this.http.post(apiUrl+'/RetailPunch/DMSSel_validate_Retail_Punch', data , {headers})
  } 


  saveSWRetailPunch(data: SWRetailPunchForm){
    const {userInfoData, headers} = this.getHttpOptions();
    let formdata = {...data}
    formdata.userid =  userInfoData.userid
    formdata.Dealer_Bill_Date = this.convertmmDDYYYY(formdata.Dealer_Bill_Date)
    return this.http.post(apiUrl+'/RetailPunch/DMSSaveRetail_Punch', formdata , {headers})
  }

  validateForm22(data: validateChassis){
    const {userInfoData, headers} = this.getHttpOptions();
    data['UserId'] = userInfoData.userid
    data.userid = userInfoData.userid

    return this.http.post(apiUrl+'/Form22/DMSSel_validate_Form22_Upload', data , {headers})
  } 

  saveFrom22(data: chassieform){
    const {userInfoData, headers} = this.getHttpOptions();
    data.CreatedBy = userInfoData.userid

    return this.http.post(apiUrl+'/Form22/DMSSaveForm22', data , {headers})
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

 

}
