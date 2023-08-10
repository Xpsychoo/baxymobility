import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { SidebarServiceService } from 'src/app/services/sidebar/sidebar-service.service';

interface MenuItem {
  label: string;
  route: string | boolean;
  icon?: string;
  submenu: MenuItem[];
  showMenu: boolean;
  RightId: string;
}

interface Right {
  RightId: string;
  RightName: string;
  MainMenuName: string;
  SubMenuName: string;
  Functional_Area: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarOpen = false;
  userInfoData: any;
  sideListItems: any;
  constructor(
    private sidebarService: SidebarServiceService,
    private cookieService: CookieService
  ) {
    this.sidebarService.sidebarState$.subscribe((isOpen) => {
      this.isSidebarOpen = isOpen;
    });
    this.userInfoData = JSON.parse(this.cookieService.get('userInfo'));
  }

  ngOnInit(): void {
    this.getSideBarMenuList();
  }

  showDropDown(index: number) {
    this.sideListItems[index].showMenu = !this.sideListItems[index].showMenu
    this.closeallotherDropDown(index)
  }

  getSideBarMenuList() {
    const reqOptions = { userid: this.userInfoData.userid, pass: this.userInfoData.key };
    this.sidebarService.getSideBarMenuList(reqOptions).subscribe(
      (response: any) => {
        const filteredArray1 = this.filterArrayByRightId(this.sidebarService.sidebarLinks, response.Detail);
        this.sideListItems = filteredArray1
      },
      (error: any) => console.log(error)
    );
  }

  filterArrayByRightId(array1: any[], array2: Right[]): MenuItem[] {
    const validRightIds = new Set(array2.map(right => right.RightId));

    function filterSubMenu(subMenu: MenuItem[]): MenuItem[] {
      return subMenu.filter(item => validRightIds.has(item.RightId));
    }

    function filterMenuItem(item: any): MenuItem {
      if (item.submenu.length > 0) {
        item.submenu = filterSubMenu(item.submenu);
        return item.submenu.length > 0 ? item : null;
      }
      return validRightIds.has(item.RightId) ? item : null;
    }

    return array1
      .map(item => filterMenuItem(item))
      .filter(item => item !== null);
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  closeallotherDropDown(index: number) {
    this.sideListItems.map((item: any) => {
      if (item.label !== this.sideListItems[index].label) {
        item.showMenu = false
      }
    })
  }
}
