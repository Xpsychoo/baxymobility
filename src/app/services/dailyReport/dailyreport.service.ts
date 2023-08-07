import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { dailyreport } from 'src/app/interfaces/dailyReport.interface';
import { punchAttendanceForm } from 'src/app/interfaces/punchattandance.inteface';
import { apiUrl } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class DailyreportService {

URL: string = apiUrl
constructor(
  private http: HttpClient,
  private cookieService: CookieService
  ) { }


  
  getDailyReportList(data: punchAttendanceForm, type: string) {
    let userInfo = this.cookieService.get('userInfo')
    let userInfoData = JSON.parse(userInfo)
    let attandanceData = {...data}
    let time = this.getdateFromForm(attandanceData.formdate, attandanceData.todate)
    attandanceData.formdate  = time.startDate
    attandanceData.todate  = time.currentDate
    attandanceData.userid = userInfoData.userid
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Change the content type to match your API requirements
        'Userid': userInfoData.userid, // Add any other custom headers if needed
        'Key': userInfoData.key, // Add any other custom headers if needed
      })
    };

    // type emp is passed then data is shown for employee daily report screen or else for current user daily report 
    if(type == "emp"){
      return this.http.post(this.URL+"/DailyReportingDetails/DMSviewdailyreportdataAdmin", attandanceData, httpOptions);
    }else{
      return this.http.post(this.URL+"/DailyReportingDetails/DMSviewdailyreportdata", attandanceData, httpOptions);
    }
  }

  // convert the date from yyyy-mm-dd to mm/dd/yyyy
  getdateFromForm(fromdate: string , endDate: string){
    const startDate = fromdate.split('-')[1]+"/"+fromdate.split('-')[2]+"/"+fromdate.split('-')[0]
    const currentDate = endDate.split('-')[1]+"/"+endDate.split('-')[2]+"/"+endDate.split('-')[0]
    return {startDate, currentDate }
  }



  // load Entry Type Data
  getEntryTypeData(){
    let userInfo = this.cookieService.get('userInfo')
    let userInfoData = JSON.parse(userInfo)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Change the content type to match your API requirements
        'Userid': userInfoData.userid, // Add any other custom headers if needed
        'Key': userInfoData.key, // Add any other custom headers if needed
      })
    };
    return this.http.post(this.URL+"/DailyReportingDetails/DMSSel_DailyReport_EntyType", null, httpOptions);
  }

  // load model data
  getModelList(){
    let userInfo = this.cookieService.get('userInfo')
    let userInfoData = JSON.parse(userInfo)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Change the content type to match your API requirements
        'Userid': userInfoData.userid, // Add any other custom headers if needed
        'Key': userInfoData.key, // Add any other custom headers if needed
      })
    };
    return this.http.post(this.URL+"/DailyReportingDetails/DMSSel_DailyReport_ModelList", null, httpOptions);
  }

   // save daily report  model data
   saveDailyReport(dailyreportData: dailyreport ){
    let userInfo = this.cookieService.get('userInfo')
    let userInfoData = JSON.parse(userInfo)
    dailyreportData.createdby = userInfoData.userid
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Change the content type to match your API requirements
        'Userid': userInfoData.userid, // Add any other custom headers if needed
        'Key': userInfoData.key, // Add any other custom headers if needed
      })
    };
    return this.http.post(this.URL+"/DailyReportingDetails/DMSSaveDailyReportData", dailyreportData, httpOptions);
  }
 
}

