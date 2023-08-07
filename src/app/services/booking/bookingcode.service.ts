import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { empForm } from 'src/app/interfaces/punchattandance.inteface';
import { apiUrl } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class BookingcodeService implements OnInit {

  URL: string = apiUrl
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    ) { }

    ngOnInit(): void {

    }


    


    getBookingSearchList(data: empForm){

      let userInfo = this.cookieService.get('userInfo')
      let userInfoData = JSON.parse(userInfo)
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', // Change the content type to match your API requirements
          'Userid': userInfoData.userid, // Add any other custom headers if needed
          'Key': userInfoData.key, // Add any other custom headers if needed
        })
      };
      data.CreatedBy = userInfoData.userid
      return this.http.post(this.URL+"/Booking/DMSSearchBooking", data, httpOptions);
    }
}

