import { Component, ElementRef, ViewChild } from '@angular/core';
import { SerachempcodeComponent } from '../../common/serachempcode/serachempcode.component';
import { DailyvisitreportService } from 'src/app/services/dailyVisitReport/dailyvisitreport.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DailyEmpVisitReportList, DealerVisitReport } from 'src/app/interfaces/dailyvisitreport.interface';
import { punchAttendanceForm } from 'src/app/interfaces/punchattandance.inteface';
import { DownloadexcelService } from 'src/app/services/common/downloadexcel.service';

@Component({
  selector: 'app-empdailyvisitreporttable',
  templateUrl: './empdailyvisitreporttable.component.html',
  styleUrls: ['./empdailyvisitreporttable.component.scss']
})
export class EmpdailyvisitreporttableComponent {
  @ViewChild(SerachempcodeComponent) childComponent!: SerachempcodeComponent;
  @ViewChild('table', {static: false}) tableRef!: ElementRef
  constructor(
    private dailyVisitReportService: DailyvisitreportService,
    private toastr: ToastrService,
    private excelService: DownloadexcelService
    ){

  }

  arrt: boolean = false
  searchForm!: FormGroup; 
  empDailyVisitList: DailyEmpVisitReportList[] = [];

  ngOnInit(): void {

    this.searchForm  = new FormGroup({
      Employeecode: new FormControl('', [Validators.required]),
      formdate: new FormControl(new Date().toISOString().split('T')[0].split('-')[0]+"-"+new Date().toISOString().split('T')[0].split('-')[1]+"-"+"01", [Validators.required]),
      todate: new FormControl(new Date().toISOString().split('T')[0],  [Validators.required]),
    });

    this.loadEmpDailyVistlist(this.searchForm.value)
  }

  loadEmpDailyVistlist(data: punchAttendanceForm){ 
    this.dailyVisitReportService.getdailyVisitList(data, "emp").subscribe((response : any)=>{
        if(response.status == 200){
          this.empDailyVisitList = response.Detail
        }else{
          this.empDailyVisitList  = []
        }
      }
    )
  }

  // load employee data
  onSubmit(){
    this.loadEmpDailyVistlist(this.searchForm.value)
  }

  // open child model
  openModalofChild(){
    this.childComponent.openModal()
  }

  setEmpCode(userCode: string){
    this.searchForm.get('Employeecode')?.setValue(userCode);
    this.searchForm.get('Employeecode')?.updateValueAndValidity();
  }

  download(){
    this.excelService.downloadExcel(this.tableRef)
  }
  

}
