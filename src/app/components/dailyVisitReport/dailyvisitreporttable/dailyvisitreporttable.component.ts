import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { punchAttendanceForm, punchPurpose, userItem } from 'src/app/interfaces/punchattandance.inteface';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DealerVisitReport } from 'src/app/interfaces/dailyvisitreport.interface';
import { DailyvisitreportService } from 'src/app/services/dailyVisitReport/dailyvisitreport.service';

@Component({
  selector: 'app-dailyvisitreporttable',
  templateUrl: './dailyvisitreporttable.component.html',
  styleUrls: ['./dailyvisitreporttable.component.scss']
})
export class DailyvisitreporttableComponent {

  constructor(
    private dailyVisitReportService: DailyvisitreportService,
    private toastr: ToastrService
    ){

  }

  searchForm!: FormGroup; 
  dailyVisitReportList: DealerVisitReport[] = []

  ngOnInit(): void {

    this.searchForm  = new FormGroup({
      Employeecode: new FormControl(''),
      formdate: new FormControl(new Date().toISOString().split('T')[0].split('-')[0]+"-"+new Date().toISOString().split('T')[0].split('-')[1]+"-"+"01", [Validators.required]),
      todate: new FormControl(new Date().toISOString().split('T')[0],  [Validators.required]),
    });

    this.loadDailyVisitReportList(this.searchForm.value)
  }

  loadDailyVisitReportList(data: punchAttendanceForm){
    this.dailyVisitReportService.getdailyVisitList(data, "user").subscribe((response : any)=>{
        if(response.status == 200){
          this.dailyVisitReportList = response.Detail
        }else{
          this.dailyVisitReportList  = []
        }
      }
    )
  }


  onSubmit(){
    this.loadDailyVisitReportList(this.searchForm.value)
  }
}
