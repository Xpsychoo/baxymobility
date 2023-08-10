import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { ErrorpageComponent } from './components/basics/errorpage/errorpage.component';
import { NewuserscreenComponent } from './components/newUserScreens/newuserscreen/newuserscreen.component';
import { PunchattendanceComponent } from './components/attendance/punchattendance/punchattendance.component';
import { ForgotpasswordComponent } from './components/signin/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/basics/changepassword/changepassword.component';
import { EmpattandanceComponent } from './components/attendance/empattandance/empattandance.component';
import { StockreceivingComponent } from './components/stocks/stockreceiving/stockreceiving.component';
import { StockreceivingreportComponent } from './components/stocks/stockreceivingreport/stockreceivingreport.component';
import { StockintrasnitComponent } from './components/stocks/stockintrasnit/stockintrasnit.component';
import { StockupdatestatusComponent } from './components/stocks/stockupdatestatus/stockupdatestatus.component';
import { DailyreportscreenComponent } from './components/dailyReport/dailyreportscreen/dailyreportscreen.component';
import { DailyreporttableComponent } from './components/dailyReport/dailyreporttable/dailyreporttable.component';
import { ViewemployeedailyreportingComponent } from './components/dailyReport/viewemployeedailyreporting/viewemployeedailyreporting.component';
import { DailyvisitreportscreenComponent } from './components/dailyVisitReport/dailyvisitreportscreen/dailyvisitreportscreen.component';
import { EmpdailyvisitreporttableComponent } from './components/dailyVisitReport/empdailyvisitreporttable/empdailyvisitreporttable.component';
import { BookingreportComponent } from './components/sales/bookingreport/bookingreport.component';
import { CreatenewjobComponent } from './components/service/createnewjob/createnewjob.component';
import { JobupdateComponent } from './components/service/jobupdate/jobupdate.component';
import { PrintjobComponent } from './components/service/printjob/printjob.component';
import { SwRetailpunchReportComponent } from './components/sales/sw-retailpunch-report/sw-retailpunch-report.component';
import { BookingsalesComponent } from './components/sales/bookingsales/bookingsales.component';
import { SwRetailpunchComponent } from './components/sales/sw-retailpunch/sw-retailpunch.component';
import { UploadformtwotwoComponent } from './components/sales/uploadformtwotwo/uploadformtwotwo.component';
import { ResetPasswordComponent } from './components/basics/reset-password/reset-password.component';
import { authGuard } from './gaurd/authguard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgotpwd', component: ForgotpasswordComponent },
  { path: 'newusers', component: NewuserscreenComponent  ,canActivate: [authGuard] },
  { path: 'viewInvoiceDetails', component: StockintrasnitComponent ,  canActivate: [authGuard] },
  { path: 'stockReceiving', component: StockreceivingComponent , canActivate: [authGuard] },
  { path: 'stockReceivingReport', component: StockreceivingreportComponent , canActivate: [authGuard] },
  { path: 'stockupdatestatus', component: StockupdatestatusComponent , canActivate: [authGuard] },
  { path: 'punchattendance', component: PunchattendanceComponent , canActivate: [authGuard] },
  { path: 'changePassword', component: ChangepasswordComponent , canActivate: [authGuard] },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'employeeattandance', component: EmpattandanceComponent , canActivate: [authGuard] },
  { path: 'dailysavereport', component: DailyreportscreenComponent , canActivate: [authGuard] },
  { path: 'downloaddailyreporting', component: DailyreporttableComponent , canActivate: [authGuard] },
  { path: 'downloademployeedailyreporting', component: ViewemployeedailyreportingComponent , canActivate: [authGuard] },
  { path: 'dailyvisitreport', component: DailyvisitreportscreenComponent , canActivate: [authGuard] },
  { path: 'downloadEmployeeDailyVisitReporting', component: EmpdailyvisitreporttableComponent , canActivate: [authGuard] },
  { path: 'bookingreport', component: BookingreportComponent , canActivate: [authGuard] },
  { path: 'createnewjob', component: CreatenewjobComponent , canActivate: [authGuard] },
  { path: 'jobupdate', component: JobupdateComponent , canActivate: [authGuard] },
  { path: 'printjob', component: PrintjobComponent , canActivate: [authGuard] },
  { path: 'retailpunchreport', component: SwRetailpunchReportComponent , canActivate: [authGuard] },
  { path: 'dmsbooking', component: BookingsalesComponent , canActivate: [authGuard] },
  { path: 'retailpunch', component: SwRetailpunchComponent , canActivate: [authGuard] },
  { path: 'uploadform22', component: UploadformtwotwoComponent , canActivate: [authGuard] },
  { path: '**', component: ErrorpageComponent},
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
