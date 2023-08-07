import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { userItem } from 'src/app/interfaces/my-interface.model';
import { UserListService } from 'src/app/services/usersdata/user-list.service';
import { UserUpdateService } from 'src/app/services/usersdata/user-update.service';

@Component({
  selector: 'app-userstable',
  templateUrl: './userstable.component.html',
  styleUrls: ['./userstable.component.scss']
})
export class UserstableComponent implements OnInit {
  usersData: userItem[] = [];
  confirmBox = false;
  currObj: any = {};
  actionType = false;

  constructor(
    private userListService: UserListService,
    private userUpdateService: UserUpdateService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUserLists();
    this.userUpdateService.userAdded$.subscribe(() => this.getUserLists());
  }

  getUserLists() {
    this.userListService.getUserLists().subscribe(
      (response: any) => (this.usersData = response.Detail),
      (error: any) => console.log(error)
    );
  }

  editUser(item: any) {
    this.userUpdateService.setObj(item);
  }

  enableDisable(object: any, type: boolean) {
    this.currObj = object;
    this.actionType = type;
    this.confirmBox = true;
  }

  disableToggle() {
    const { currObj, actionType } = this;
    this.userListService
      .updateUser({ ...currObj, Flag: 'activeinactive', Status: actionType ? 1 : 0 })
      .subscribe({
        next: (response: any) => {
          this.toastr.success(response.Message);
          this.getUserLists();
          this.confirmBox = false;
        },
        error: (error: any) => console.log(error)
      });
  }

  setConfirmBox(value: boolean) {
    this.confirmBox = value;
  }
}
