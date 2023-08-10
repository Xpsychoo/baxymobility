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
    oldPwd: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
    pass: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
    conPass: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
  });

  async submitHandler() {
    console.log(this.loginForm.value);
    
    if (this.loginForm.invalid) {
      this.toastr.error('Invalid form data. Please check the fields.');
      return;
    }

    const { pass, oldPwd, conPass } = this.loginForm.value;

    if (pass !== conPass) {
      this.toastr.error('Password does not match.');
      return;
    }
    
    const userInfoData = JSON.parse(this.cookieService.get('userInfo'));
    const encodedPassword = await this.encodePassword(pass?.toUpperCase());
    const encodedOldPassword = await this.encodePassword(oldPwd?.toUpperCase());

    this.changePasswordReq({
      userid: userInfoData.userid, pass: encodedPassword, oldPassword: encodedOldPassword
    });
  }

  private async encodePassword(inputPassword: string | null | undefined): Promise<string> {
    if (!inputPassword) {
      this.toastr.error('Invalid password provided.');
      return '';
    }

    try {
      const response: any = await this.convertBase64.encodeData({ sData: inputPassword }).toPromise();
      return response;
    } catch (error) {
      this.toastr.error('something went wrong');
      return '';
    }
  }

  changePasswordReq(data: any) {
    this.userLoginService.changePassword(data).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.toastr.success(response.Message);
          this.loginForm.reset();
        } else {
          this.toastr.info(response.Message);
        }
      },
      (error: any) => {
        this.toastr.error(error.statusText);
      }
    );
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
