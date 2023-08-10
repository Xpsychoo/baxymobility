import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SerachempcodeComponent } from '../../common/serachempcode/serachempcode.component';
import { DailyreportService } from 'src/app/services/dailyReport/dailyreport.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DailyReportData } from 'src/app/interfaces/dailyReport.interface';
import { punchAttendanceForm } from 'src/app/interfaces/punchattandance.inteface';
import { DownloadexcelService } from 'src/app/services/common/downloadexcel.service';

@Component({
  selector: 'app-viewemployeedailyreporting',
  templateUrl: './viewemployeedailyreporting.component.html',
  styleUrls: ['./viewemployeedailyreporting.component.scss']
})
export class ViewemployeedailyreportingComponent implements OnInit {

  @ViewChild(SerachempcodeComponent) childComponent!: SerachempcodeComponent;
  @ViewChild('table', {static: false}) tableRef!: ElementRef
  constructor(
    private dailyreportService: DailyreportService,
    private toastr: ToastrService,
    private excelService: DownloadexcelService
    ){

  }

  arrt: boolean = false
  searchForm!: FormGroup; 
  DailyReportList: DailyReportData[] = [];

  ngOnInit(): void {

    this.searchForm  = new FormGroup({
      Employeecode: new FormControl('', [Validators.required]),
      formdate: new FormControl(new Date().toISOString().split('T')[0].split('-')[0]+"-"+new Date().toISOString().split('T')[0].split('-')[1]+"-"+"01", [Validators.required]),
      todate: new FormControl(new Date().toISOString().split('T')[0],  [Validators.required]),
    });

    this.loadAttandancelist(this.searchForm.value)
  }

  loadAttandancelist(data: punchAttendanceForm){
    
    this.dailyreportService.getDailyReportList(data, "emp").subscribe((response : any)=>{
  
        if(response.status == 200){
          this.DailyReportList = response.Detail
        }else{
          this.DailyReportList  = []
        }
      }
    )
  }

  // load employee data
  onSubmit(){
    this.loadAttandancelist(this.searchForm.value)
  }

  // open child model
  openModalofChild(){
    this.childComponent.openModal()
  }

  setEmpCode(userCode: string){
    this.searchForm.get('Employeecode')?.setValue(userCode);
    this.searchForm.get('Employeecode')?.updateValueAndValidity();
  }
 // Your DailyReportList data array (make sure it's already populated)

 download(){
  this.excelService.downloadExcel(this.tableRef)
 }

 
}
