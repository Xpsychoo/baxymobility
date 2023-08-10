import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Converttobase64Service } from 'src/app/services/common/converttobase64.service';
import { UserloginService } from 'src/app/services/userlogin.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  constructor(
    private userLoginService: UserloginService,
    private convertBase64: Converttobase64Service,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    if (!this.cookieService.get('rpot')) {
      this.router.navigate(['/forgotpwd']);
      this.toastr.error('Please Try Again');
    }
  }
  
  loginForm = new FormGroup({
    pass: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
    conPass: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]),
  });

  async submitHandler() {
    const userInfoData = JSON.parse(this.cookieService.get('rpot'));

    if (this.loginForm.invalid) {
      this.toastr.error('Invalid form data. Please check the fields.');
      return;
    }

    const { pass, conPass } = this.loginForm.value;

    if (pass !== conPass) {
      this.toastr.error('Password does not match.');
      return;
    }
    
    const encodedPassword = await this.encodePassword(pass?.toUpperCase());

    this.changePasswordReq({ userid: userInfoData.userid, pass: encodedPassword});
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
    this.userLoginService.resetPassword(data).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.toastr.success(response.Message);
          this.loginForm.reset();
          this.cookieService.delete('rpot');
          this.router.navigate(['/']);
        } else {
          this.toastr.info(response.Message);
        }
      },
      (error: any) => {
        this.toastr.error(error.statusText);
      }
    );
  }


  get pass() {
    return this.loginForm.get('pass');
  }

  get conPass() {
    return this.loginForm.get('conPass');
  }
}
