import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarServiceService } from 'src/app/services/sidebar/sidebar-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarOpen = false;

  constructor(private sidebarService: SidebarServiceService) {
    this.sidebarService.sidebarState$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
  }
  
  sidebarLinks = [
    { label: 'New User Creation', route: '/newusers', icon:'adduser', submenu: [], showMenu: false },
    {
      label: 'Attendance',  icon:'attendence',  route: false, submenu: [
        { label: 'Punch Attendance', route: 'punchattendance' },
        { label: 'View Attendance', route: '/punchattendance' }, 
        { label: 'View Employees Attendance' , route: 'employeeattandance'}
      ], showMenu: false
    },
    {
      label: 'Daily Reporting', icon:'dailyreporting',  route: false, submenu: [
        { label: 'Save Daily Reporting', route: 'dailysavereport' },
        { label: 'Download Daily Reporting', route: 'downloaddailyreporting' }, 
        { label: 'View Employees Daily Reporting' , route: 'downloademployeedailyreporting'}
      ], showMenu: false
    },

    {
      label: 'Daily Visit Reporting', icon:'reports',  route: false, submenu: [
        { label: 'Save Daily Visit Reporting', route: 'dailyvisitreport' },
        { label: 'Download Daily Visit Reporting', route: 'dailyvisitreport' }, 
        { label: 'View Employees Daily Visit Reporting' , route: 'downloadEmployeeDailyVisitReporting'}
      ], showMenu: false
    },

    {
      label: 'Stock', route: false, icon:'stock',  submenu: [
        { label: 'In-Transit', route: '/viewInvoiceDetails' },
        { label: 'Stock Receiving', route: '/stockReceiving' }, 
        { label: 'Update Stock Receiving Status' , route: '/stockupdatestatus'},
        { label: 'Stock Receiving Report' , route: '/stockReceivingReport'}
      ], showMenu: false
    },
    {
      label: 'Sales', route: false, icon:'sales',  submenu: [
        { label: 'Booking', route: 'dmsbooking' },
        { label: 'Booking Report', route: 'bookingreport' }, 
        { label: 'SW/Retail Punch' , route: 'retailpunch'},
        { label: 'SW/Retail Punch Report' , route: 'retailpunchreport'},
        { label: 'Update Form 22' , route: 'uploadform22'},
      ], showMenu: false
    },
    {
      label: 'Service', route: false, icon:'service',  submenu: [
        { label: 'Create New Job Card', route: '/createnewjob' },
        { label: 'Update Job Card', route: '/jobupdate' }, 
        { label: 'PrintJob Card' , route: '/printjob'}
      ], showMenu: false
    }
  ];

  showDropDown(index: number) {
    this.sidebarLinks[index].showMenu = !this.sidebarLinks[index].showMenu
    // close all other dropdown
    this.closeallotherDropDown(index)
  }

  closeSideBar() {
    if (window.innerWidth < 990) {
      this.toggleSidebar();
    }
  }  

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  closeallotherDropDown(index: number){
    this.sidebarLinks.map((item: any)=>{
      if(item.label !== this.sidebarLinks[index].label){
        item.showMenu = false
      }
    })
  }
}
