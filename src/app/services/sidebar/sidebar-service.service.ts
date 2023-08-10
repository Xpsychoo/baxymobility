import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { apiUrl } from 'src/app/utils/constants';
import { getHttpOptions } from 'src/app/utils/http-utils';

@Injectable({
  providedIn: 'root'
})

export class SidebarServiceService {

  private sidebarStateSubject = new BehaviorSubject<boolean>(true);
  public sidebarState$ = this.sidebarStateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getSideBarMenuList(data: any) {
    return this.http.post(`${apiUrl}/login/DMSSetMenuList`, data, getHttpOptions(this.cookieService));
  }

  toggleSidebar(): void {
    this.sidebarStateSubject.next(!this.sidebarStateSubject.getValue());
  }

  sidebarLinks = [
    { label: 'New User Creation', route: '/newusers', icon: 'adduser', submenu: [], showMenu: false, RightId: "15" },
    {
      label: 'Attendance', icon: 'attendence', route: false, submenu: [
        { label: 'Punch Attendance', route: 'punchattendance', RightId: "6" },
        { label: 'View Attendance', route: '/punchattendance', RightId: "7" },
        { label: 'View Employees Attendance', route: 'employeeattandance', RightId: "7" }
      ], showMenu: false
    },
    {
      label: 'Daily Reporting', icon: 'dailyreporting', route: false, submenu: [
        { label: 'Save Daily Reporting', route: 'dailysavereport', RightId: "2" },
        { label: 'Download Daily Reporting', route: 'downloaddailyreporting', RightId: "8" },
        { label: 'View Employees Daily Reporting', route: 'downloademployeedailyreporting', RightId: "8" }
      ], showMenu: false
    },

    {
      label: 'Daily Visit Reporting', icon: 'reports', route: false, submenu: [
        { label: 'Save Daily Visit Reporting', route: 'dailyvisitreport', RightId: "10" },
        { label: 'Download Daily Visit Reporting', route: 'dailyvisitreport', RightId: "11" },
        { label: 'View Employees Daily Visit Reporting', route: 'downloadEmployeeDailyVisitReporting', RightId: "11" }
      ], showMenu: false
    },

    {
      label: 'Stock', route: false, icon: 'stock', submenu: [
        { label: 'In-Transit', route: '/viewInvoiceDetails', RightId: "4" },
        { label: 'Stock Receiving', route: '/stockReceiving', RightId: "5" },
        { label: 'Update Stock Receiving Status', route: '/stockupdatestatus', RightId: "9" },
        { label: 'Stock Receiving Report', route: '/stockReceivingReport', RightId: "12" }
      ], showMenu: false
    },
    {
      label: 'Sales', route: false, icon: 'sales', submenu: [
        { label: 'Booking', route: 'dmsbooking', RightId: "16" },
        { label: 'Booking Report', route: 'bookingreport', RightId: "17" },
        { label: 'SW/Retail Punch', route: 'retailpunch', RightId: "6" },
        { label: 'SW/Retail Punch Report', route: 'retailpunchreport', RightId: "13" },
        { label: 'Update Form 22', route: 'uploadform22', RightId: "18" },
      ], showMenu: false
    },
    {
      label: 'Service', route: false, icon: 'service', submenu: [
        { label: 'Create New Job Card', route: '/createnewjob', RightId: "19" },
        { label: 'Update Job Card', route: '/jobupdate', RightId: "19" },
        { label: 'PrintJob Card', route: '/printjob', RightId: "19" }
      ], showMenu: false
    }
  ];
}
