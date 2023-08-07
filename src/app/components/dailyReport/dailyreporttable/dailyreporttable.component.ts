import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DailyReportData } from 'src/app/interfaces/dailyReport.interface';
import { punchAttendanceForm } from 'src/app/interfaces/punchattandance.inteface';
import { DailyreportService } from 'src/app/services/dailyReport/dailyreport.service';
import { DealerscodeService } from 'src/app/services/dealersdata/dealerscode.service';

@Component({
  selector: 'app-dailyreporttable',
  templateUrl: './dailyreporttable.component.html',
  styleUrls: ['./dailyreporttable.component.scss']
})
export class DailyreporttableComponent {
  constructor(
    private dailyReport: DailyreportService,
    private toastr: ToastrService
    ){

  }

  searchForm!: FormGroup; 
  DailyReportList: DailyReportData[] = []

  ngOnInit(): void {

    this.searchForm  = new FormGroup({
      Employeecode: new FormControl(''),
      formdate: new FormControl(new Date().toISOString().split('T')[0].split('-')[0]+"-"+new Date().toISOString().split('T')[0].split('-')[1]+"-"+"01", [Validators.required]),
      todate: new FormControl(new Date().toISOString().split('T')[0],  [Validators.required]),
    });

    this.loaddailyReportlist(this.searchForm.value)
  }

  loaddailyReportlist(data: punchAttendanceForm){
    this.dailyReport.getDailyReportList(data, "user").subscribe((response : any)=>{
        if(response.status == 200){
          this.DailyReportList = response.Detail
        }else{
          this.toastr.error(response.Message)
          this.DailyReportList  = []
        }
      }
    )
  }

  onSubmit(){

    this.loaddailyReportlist(this.searchForm.value)
  }
}
