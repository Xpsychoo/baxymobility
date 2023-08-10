import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/basics/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { ErrorpageComponent } from './components/basics/errorpage/errorpage.component';
import { ConfirmboxComponent } from './components/basics/confirmbox/confirmbox.component';
import { LoadercardComponent } from './components/basics/loadercard/loadercard.component';
import { SidebarComponent } from './components/basics/sidebar/sidebar.component';
import { FooterComponent } from './components/basics/footer/footer.component';
import { NewuserscreenComponent } from './components/newUserScreens/newuserscreen/newuserscreen.component';
import { UserstableComponent } from './components/newUserScreens/userstable/userstable.component';
import { UserListService } from './services/usersdata/user-list.service';
import { PunchattendanceComponent } from './components/attendance/punchattendance/punchattendance.component';
import { PunchattandancetableComponent } from './components/attendance/punchattandancetable/punchattandancetable.component';
import { ForgotpasswordComponent } from './components/signin/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/basics/changepassword/changepassword.component';
import { UserUpdateService } from './services/usersdata/user-update.service';
import { StockreceivingComponent } from './components/stocks/stockreceiving/stockreceiving.component';
import { StockreceivingreportComponent } from './components/stocks/stockreceivingreport/stockreceivingreport.component';
import { EmpattandanceComponent } from './components/attendance/empattandance/empattandance.component';
import { StockintrasnitComponent } from './components/stocks/stockintrasnit/stockintrasnit.component';
import { SerachempcodeComponent } from './components/common/serachempcode/serachempcode.component';
import { StockupdatestatusComponent } from './components/stocks/stockupdatestatus/stockupdatestatus.component';
import { DailyreportscreenComponent } from './components/dailyReport/dailyreportscreen/dailyreportscreen.component';
import { DailyreporttableComponent } from './components/dailyReport/dailyreporttable/dailyreporttable.component';
import { SearchdealercodeComponent } from './components/common/searchdealercode/searchdealercode.component';
import { ViewemployeedailyreportingComponent } from './components/dailyReport/viewemployeedailyreporting/viewemployeedailyreporting.component';
import { DailyvisitreportscreenComponent } from './components/dailyVisitReport/dailyvisitreportscreen/dailyvisitreportscreen.component';
import { DailyvisitreporttableComponent } from './components/dailyVisitReport/dailyvisitreporttable/dailyvisitreporttable.component';
import { EmpdailyvisitreporttableComponent } from './components/dailyVisitReport/empdailyvisitreporttable/empdailyvisitreporttable.component';
import { BookingsalesComponent } from './components/sales/bookingsales/bookingsales.component';
import { BookingreportComponent } from './components/sales/bookingreport/bookingreport.component';
import { SwRetailpunchComponent } from './components/sales/sw-retailpunch/sw-retailpunch.component';
import { SwRetailpunchReportComponent } from './components/sales/sw-retailpunch-report/sw-retailpunch-report.component';
import { UploadformtwotwoComponent } from './components/sales/uploadformtwotwo/uploadformtwotwo.component';
import { ValuePipe } from './pipes/value.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { CreatenewjobComponent } from './components/service/createnewjob/createnewjob.component';
import { JobupdateComponent } from './components/service/jobupdate/jobupdate.component';
import { PrintjobComponent } from './components/service/printjob/printjob.component';
import { SearchbookingcodeComponent } from './components/common/searchbookingcode/searchbookingcode.component';
import { ResetPasswordComponent } from './components/basics/reset-password/reset-password.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SigninComponent,
    ErrorpageComponent,
    ConfirmboxComponent,
    LoadercardComponent,
    SidebarComponent,
    FooterComponent,
    NewuserscreenComponent,
    UserstableComponent,
    PunchattendanceComponent,
    PunchattandancetableComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    StockreceivingComponent,
    StockreceivingreportComponent,
    EmpattandanceComponent,
    StockintrasnitComponent,
    SerachempcodeComponent,
    StockupdatestatusComponent,
    DailyreportscreenComponent,
    DailyreporttableComponent,
    SearchdealercodeComponent,
    ViewemployeedailyreportingComponent,
    DailyvisitreportscreenComponent,
    DailyvisitreporttableComponent,
    EmpdailyvisitreporttableComponent,
    BookingsalesComponent,
    BookingreportComponent,
    SwRetailpunchComponent,
    SwRetailpunchReportComponent,
    UploadformtwotwoComponent,
    ValuePipe,
    KeysPipe,
    CreatenewjobComponent,
    JobupdateComponent,
    PrintjobComponent,
    SearchbookingcodeComponent,
    ResetPasswordComponent,
  ],
  imports: [BrowserModule, NgbModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule,
    HttpClientModule, CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}),],
  providers: [CookieService,UserListService,UserUpdateService],
  bootstrap: [AppComponent],
})
export class AppModule { }
