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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'forgotpwd', component: ForgotpasswordComponent },
  { path: 'newusers', component: NewuserscreenComponent,  },
  { path: 'viewInvoiceDetails', component: StockintrasnitComponent },
  { path: 'stockReceiving', component: StockreceivingComponent },
  { path: 'stockReceivingReport', component: StockreceivingreportComponent },
  { path: 'stockupdatestatus', component: StockupdatestatusComponent },
  { path: 'punchattendance', component: PunchattendanceComponent },
  { path: 'changePassword', component: ChangepasswordComponent },
  { path: 'employeeattandance', component: EmpattandanceComponent },
  { path: 'dailysavereport', component: DailyreportscreenComponent },
  { path: 'downloaddailyreporting', component: DailyreporttableComponent },
  { path: 'downloademployeedailyreporting', component: ViewemployeedailyreportingComponent },
  { path: 'dailyvisitreport', component: DailyvisitreportscreenComponent },
  { path: 'downloadEmployeeDailyVisitReporting', component: EmpdailyvisitreporttableComponent },
  { path: 'bookingreport', component: BookingreportComponent },
  { path: 'createnewjob', component: CreatenewjobComponent },
  { path: 'jobupdate', component: JobupdateComponent },
  { path: 'printjob', component: PrintjobComponent },
  { path: 'retailpunchreport', component: SwRetailpunchReportComponent },
  { path: 'dmsbooking', component: BookingsalesComponent },
  { path: 'retailpunch', component: SwRetailpunchComponent },
  { path: 'uploadform22', component: UploadformtwotwoComponent },
  { path: '**', component: ErrorpageComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
