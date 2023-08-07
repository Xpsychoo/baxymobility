import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { punchAttendanceForm, punchAttendanceList } from 'src/app/interfaces/punchattandance.inteface';
import { PunchServiceService } from 'src/app/services/punchdata/punch-service.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-punchattandancetable',
  templateUrl: './punchattandancetable.component.html',
  styleUrls: ['./punchattandancetable.component.scss']
})
export class PunchattandancetableComponent implements OnInit {

  constructor(
    private punchService: PunchServiceService,
    private toastr: ToastrService
    ){

  }

  searchForm!: FormGroup; 
  punchAttandaceList: punchAttendanceList[] = []

  ngOnInit(): void {

    this.searchForm  = new FormGroup({
      Employeecode: new FormControl(''),
      formdate: new FormControl(new Date().toISOString().split('T')[0].split('-')[0]+"-"+new Date().toISOString().split('T')[0].split('-')[1]+"-"+"01", [Validators.required]),
      todate: new FormControl(new Date().toISOString().split('T')[0],  [Validators.required]),
    });

    this.loadAttandancelist(this.searchForm.value)
    this.punchService.punchDataList.subscribe((data)=>{
      if(data){
        this.loadAttandancelist(this.searchForm.value)
      }
    })
  }

  loadAttandancelist(data: punchAttendanceForm){
    this.punchService.getAttandanceList(data, "user").subscribe((response : any)=>{
        if(response.status == 200){
          this.punchAttandaceList = response.Detail
        }else{
          this.toastr.error(response.Message)
          this.punchAttandaceList  = []
        }
      }
    )
  }

  onSubmit(){
    this.loadAttandancelist(this.searchForm.value)
  }
 
}
