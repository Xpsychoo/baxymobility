import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DailyVisitReportForm } from 'src/app/interfaces/dailyvisitreport.interface';
import { punchAttendanceForm } from 'src/app/interfaces/punchattandance.inteface';
import { apiUrl } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class DailyvisitreportService {

  URL : string = apiUrl
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    ) { }

    addDailyVisitForm(data: DailyVisitReportForm) {
      let userInfo = this.cookieService.get('userInfo')
      let userInfoData = JSON.parse(userInfo)
      let dailyvisitFormData = {...data}
    
      dailyvisitFormData.ReportDate = this.convertmmDDYYYY(dailyvisitFormData.ReportDate)
      dailyvisitFormData.createdby = userInfoData.userid
     
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', // Change the content type to match your API requirements
          'Userid': userInfoData.userid, // Add any other custom headers if needed
          'Key': userInfoData.key, // Add any other custom headers if needed
        })
      };
  
      return this.http.post(this.URL+"/DailyVisitReportingDetails/DMSSaveVisitDailyReportData", dailyvisitFormData, httpOptions);
    }


  getdailyVisitList(data: punchAttendanceForm, type: string) {
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

    if(type == "emp"){  
      if(!attandanceData?.Employeecode) {attandanceData.Employeecode = ""}
      return this.http.post(this.URL+"/DailyVisitReportingDetails/DMSviewdailyVisitreportdataAdmin", attandanceData, httpOptions);
    }else{
      return this.http.post(this.URL+"/DailyVisitReportingDetails/DMSviewdailyVisitreportdata", attandanceData, httpOptions);
    }
  }

  
  getdateFromForm(fromdate: string , endDate: string){
    const startDate = fromdate.split('-')[1]+"/"+fromdate.split('-')[2]+"/"+fromdate.split('-')[0]
    const currentDate = endDate.split('-')[1]+"/"+endDate.split('-')[2]+"/"+endDate.split('-')[0]
    return {startDate, currentDate }
  }

  convertmmDDYYYY(date: string){
    const currentDate = date.split('-')[1]+"/"+date.split('-')[2]+"/"+date.split('-')[0]
    return currentDate
  }

}
