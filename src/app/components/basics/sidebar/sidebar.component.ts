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
        { label: 'Punch Attendance', route: '/' },
        { label: 'View Attendance', route: '/' }, 
        { label: 'View Employees Attendance' , route: '/'}
      ], showMenu: false
    },
    {
      label: 'Daily Reporting', icon:'dailyreporting',  route: false, submenu: [
        { label: 'Save Daily Reporting', route: '/' },
        { label: 'Download Daily Reporting', route: '/' }, 
        { label: 'View Employees Daily Reporting' , route: '/'}
      ], showMenu: false
    },

    {
      label: 'Daily Visit Reporting', icon:'reports',  route: false, submenu: [
        { label: 'Save Daily Visit Reporting', route: '/' },
        { label: 'Download Daily Visit Reporting', route: '/' }, 
        { label: 'View Employees Daily Visit Reporting' , route: '/'}
      ], showMenu: false
    },

    {
      label: 'Stock', route: false, icon:'stock',  submenu: [
        { label: 'In-Transit', route: '/' },
        { label: 'Stock Receiving', route: '/' }, 
        { label: 'Update Stock Receiving Status' , route: '/'},
        { label: 'Stock Receiving Report' , route: '/'}
      ], showMenu: false
    },
    {
      label: 'Sales', route: false, icon:'sales',  submenu: [
        { label: 'Booking', route: '/' },
        { label: 'Booking Report', route: '/' }, 
        { label: 'SW/Retail Punch' , route: '/'},
        { label: 'SW/Retail Punch Report' , route: '/'},
        { label: 'Update Form 22' , route: '/'},
      ], showMenu: false
    },
    {
      label: 'Service', route: false, icon:'service',  submenu: [
        { label: 'Create New Job Card', route: '/' },
        { label: 'Update Job Card', route: '/' }, 
        { label: 'PrintJob Card' , route: '/'}
      ], showMenu: false
    }
  ];

  showDropDown(index: number) {
    this.sidebarLinks[index].showMenu = !this.sidebarLinks[index].showMenu
    // close all other dropdown
    this.closeallotherDropDown(index)
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
