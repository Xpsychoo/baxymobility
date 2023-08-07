import { HttpClient, HttpHeaders} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { empForm, empSearchFace, punchAttendanceForm, punchAttendanceList, punchPurpose, userItem } from 'src/app/interfaces/punchattandance.inteface';
import { apiUrl } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PunchServiceService {
  URL: string = apiUrl
  constructor(
    private http : HttpClient,
    private cookieService: CookieService
  ) { }

  punchDataList = new EventEmitter<boolean>(false);
  getPunchPurpose() {
    let userInfo = this.cookieService.get('userInfo')
    let userInfoData = JSON.parse(userInfo)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Change the content type to match your API requirements
        'Userid': userInfoData.userid, // Add any other custom headers if needed
        'Key': userInfoData.key, // Add any other custom headers if needed
      })
    };

    return this.http.post(this.URL+"/PunchAttendance/DMSselAttendancePurpose", null, httpOptions);
  }

  getAttandanceList(data: punchAttendanceForm, type: string) {
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
      return this.http.post(this.URL+"/PunchAttendance/DMSsel_viewattendanceAdmin", attandanceData, httpOptions);
    }else{
      return this.http.post(this.URL+"/PunchAttendance/DMSsel_viewattendance", attandanceData, httpOptions);
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

  addAttendanceForm(data: userItem) {
    let userInfo = this.cookieService.get('userInfo')
    let userInfoData = JSON.parse(userInfo)
    let punchformdata = {...data}
    punchformdata.userid = userInfoData.userid
    if(punchformdata.punchpurpose !== "Leave"){
      punchformdata.ToPunchdate = punchformdata.FromPunchdate
    }
    punchformdata.FromPunchdate = this.convertmmDDYYYY(punchformdata.FromPunchdate)
  
    punchformdata.ToPunchdate = this.convertmmDDYYYY(punchformdata.ToPunchdate)
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Change the content type to match your API requirements
        'Userid': userInfoData.userid, // Add any other custom headers if needed
        'Key': userInfoData.key, // Add any other custom headers if needed
      })
    };

    return this.http.post(this.URL+"/PunchAttendance/DMSSavePunchAttendanceV3", punchformdata, httpOptions);
  }


  // common code for getiing employee code , used in various model
  getEmpSearchList(data: empForm){

    let userInfo = this.cookieService.get('userInfo')
    let userInfoData = JSON.parse(userInfo)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Change the content type to match your API requirements
        'Userid': userInfoData.userid, // Add any other custom headers if needed
        'Key': userInfoData.key, // Add any other custom headers if needed
      })
    };
    return this.http.post(this.URL+"/DailyReportingDetails/DMSSearchEmployee", data, httpOptions);
  }

}
