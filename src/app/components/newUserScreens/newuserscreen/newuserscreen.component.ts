import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from 'src/app/services/usersdata/user-list.service';
import { UserUpdateService } from 'src/app/services/usersdata/user-update.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-newuserscreen',
  templateUrl: './newuserscreen.component.html',
  styleUrls: ['./newuserscreen.component.scss'],
})
export class NewuserscreenComponent implements OnDestroy, OnInit {
  newItemForm: FormGroup;
  isEditMode = false;
  editedData: object = {};
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private userListService: UserListService,
    private toastr: ToastrService,
    private userUpdateService: UserUpdateService
  ) {
    this.newItemForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      ContactNo: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Functional_Area: ['', Validators.required],
    });

    this.userUpdateService
      .GetObj()
      .pipe(
        takeUntil(this.destroy$),
        tap((userData: any) => {
          this.newItemForm.patchValue(userData);
          this.isEditMode = Boolean(userData);
          this.editedData = userData;
        })
      )
      .subscribe();
  }
  ngOnInit(){
    
  }

  onSubmit(): void {        
    const request$ = this.isEditMode
      ? this.userListService.updateUser({ ...this.editedData, ...this.newItemForm.value, Flag: 'updtprf', })
      : this.userListService.addUser(this.removeEmptyKeys(this.newItemForm.value));

    request$
      .pipe(
        takeUntil(this.destroy$),
        tap(
          (response: any) => {
            this.toastr.info(response.Message);
            this.isEditMode = false;
            this.newItemForm.reset();
            this.userUpdateService.triggerUserAdded();
          },
          (error: any) => {
            console.log(error);
          }
        )
      )
      .subscribe();
  }

  removeEmptyKeys(obj: any): any {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== ''));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
