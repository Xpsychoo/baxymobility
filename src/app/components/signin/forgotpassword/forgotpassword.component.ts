import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthSharedService } from 'src/app/services/auth-shared-service.service';
import { UserloginService } from 'src/app/services/userlogin.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  userData: any;
  otpValue: string = '';
  @ViewChild('otpModal') otpModal!: ElementRef;

  constructor(
    private userLoginService: UserloginService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private cookieService: CookieService,
    private router: Router,
    private authSharedService: AuthSharedService
  ) { }

  loginForm = new FormGroup({
    userid: new FormControl('', [Validators.required]),
  });

  otpForm = new FormGroup({
    userOtp: new FormControl('', [Validators.required]),
  });

  submitHandler() {    
    this.userLoginService.userlogin(this.loginForm.value).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.toastr.success(response.Message);
          this.closeModal();
          this.cookieService.set('token', 'token here');
          this.cookieService.set('userInfo', response.Detail);
          this.authSharedService.setIsLoggedIn(true);
        }else  {
          this.toastr.error(response.Message)
        }
      },
      (error: any) => {
        console.log(error);        
        this.toastr.error(error.statusText);
      }
    );
  }

  onInputKeypress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    if (inputValue.length >= 4) {
      const truncatedValue = inputValue.slice(0, 4);
      this.renderer.setProperty(input, 'value', truncatedValue);
      event.preventDefault();
    }
  }

  otpSubmit() {
    const reqOptions = {
      ...this.otpForm.value,
      ...this.loginForm.value,
    };
    this.userLoginService.otpSubmitFunc(reqOptions).subscribe(
      (data: any) => {
        const userInfoString = JSON.stringify(data.data);
        this.closeModal();
        this.cookieService.set('token', data.acesstoken);
        this.cookieService.set('userInfo', userInfoString);
        this.otpForm.controls['userOtp'].setValue('');
        this.router.navigate(['/']);
        this.authSharedService.setIsLoggedIn(true);
      },
      (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }

  openModal() {
    this.modalService.open(this.otpModal, { centered: true, backdrop: 'static' });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  get userid() {
    return this.loginForm.get('userid');
  }
}
