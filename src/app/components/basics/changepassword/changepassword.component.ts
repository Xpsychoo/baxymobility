import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Converttobase64Service } from 'src/app/services/common/converttobase64.service';
import { UserloginService } from 'src/app/services/userlogin.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent {

  constructor(
    private userLoginService: UserloginService,
    private convertBase64: Converttobase64Service,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) { }

  loginForm = new FormGroup({
    oldPwd: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
    pass: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
    conPass: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
  });

  submitHandler() {
    if (this.loginForm.invalid) {
      this.toastr.error('Invalid form data. Please check the fields.');
      return;
    }

    const password = this.loginForm.value.pass;
    const confirmPassword = this.loginForm.value.conPass;

    if (password !== confirmPassword) {
      this.toastr.error('Password does not match.');
      return;
    }

    this.changePassword(password);
  
  }

  private changePassword(newPassword: string | null | undefined): void {
    if (!newPassword) {
      this.toastr.error('Invalid password provided.');
      return;
    }

    const userInfoData = JSON.parse(this.cookieService.get('userInfo'));
    
    this.convertBase64.encodeData({ sData: newPassword }).subscribe(
      (response: any) => {
        this.changePasswordReq({ userid :userInfoData.userid, pass: response })
      },
      (error: any) => {
        this.toastr.error('something went wrong')
      }
    );

      
  }

  changePasswordReq(data:any){    

    
   /*  this.userLoginService.changePassword(data).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.toastr.success(response.Message);
        } else {
          this.toastr.info(response.Message);
        }
      },
      (error: any) => {
        this.toastr.error(error.statusText);
      }
    ); */
  }

  get oldPwd() {
    return this.loginForm.get('oldPwd');
  }

  get pass() {
    return this.loginForm.get('pass');
  }

  get conPass() {
    return this.loginForm.get('conPass');
  }

}
