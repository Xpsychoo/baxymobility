import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { punchAttendanceForm, punchAttendanceList } from 'src/app/interfaces/punchattandance.inteface';
import { PunchServiceService } from 'src/app/services/punchdata/punch-service.service';
import { SerachempcodeComponent } from '../../common/serachempcode/serachempcode.component';
import { DownloadexcelService } from 'src/app/services/common/downloadexcel.service';
@Component({
  selector: 'app-empattandance',
  templateUrl: './empattandance.component.html',
  styleUrls: ['./empattandance.component.scss']
})
export class EmpattandanceComponent {
  @ViewChild(SerachempcodeComponent) childComponent!: SerachempcodeComponent;
  @ViewChild('table', {static: false}) tableRef!: ElementRef
  constructor(
    private punchService: PunchServiceService,
    private toastr: ToastrService,
    private excelService: DownloadexcelService
    ){

  }

  arrt: boolean = false
  searchForm!: FormGroup; 
  punchAttandaceList: punchAttendanceList[] = [];

  ngOnInit(): void {

    this.searchForm  = new FormGroup({
      Employeecode: new FormControl('', [Validators.required]),
      formdate: new FormControl(new Date().toISOString().split('T')[0].split('-')[0]+"-"+new Date().toISOString().split('T')[0].split('-')[1]+"-"+"01", [Validators.required]),
      todate: new FormControl(new Date().toISOString().split('T')[0],  [Validators.required]),
    });

    this.loadAttandancelist(this.searchForm.value)
  }

  loadAttandancelist(data: punchAttendanceForm){
    this.punchService.getAttandanceList(data, "emp").subscribe((response : any)=>{
        if(response.status == 200){
          this.punchAttandaceList = response.Detail
        }else{
          this.punchAttandaceList  = []
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


  download(){
    this.excelService.downloadExcel(this.tableRef)
  }

 
}
