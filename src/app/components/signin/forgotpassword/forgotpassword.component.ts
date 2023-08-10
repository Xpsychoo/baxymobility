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
    otp: new FormControl('', [Validators.required]),
  });

  submitHandler() {
    const reqOptions = { ...this.loginForm.value, pass:'123456', otp: '', flag: "CreateOTP" }
     this.userLoginService.forgotpassword(reqOptions).subscribe(
       (response: any) => {
        if (response.status === 200) {
          this.toastr.success(response.Message);
          this.openModal();
        }else{
          this.toastr.info(response.Message);
        }
       },
       (error: any) => {
         this.toastr.error(error.Message);
       }
     );
  }

  onInputKeypress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    if (inputValue.length >= 6) {
      const truncatedValue = inputValue.slice(0, 6);
      this.renderer.setProperty(input, 'value', truncatedValue);
      event.preventDefault();
    }
  }

  otpSubmit() {
    const Data = {...this.loginForm.value}
    const reqOptions = { ...this.loginForm.value, ...this.otpForm.value, pass:'123456', flag: "CheckOTP" }    
     this.userLoginService.forgotpassword(reqOptions).subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.closeModal();
          this.toastr.success(data.Message);
          this.cookieService.set('rpot', JSON.stringify(Data));
          this.otpForm.controls['otp'].setValue('');
          this.router.navigate(['/resetPassword']);
        }else{
          this.toastr.success(data.Message);
        }
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
  cancelResetPwd(){
    this.closeModal();
    this.router.navigate(['/']);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  get userid() {
    return this.loginForm.get('userid');
  }
}
