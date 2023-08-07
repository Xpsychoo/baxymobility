import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { empSearchFace } from 'src/app/interfaces/punchattandance.inteface';
import { PunchServiceService } from 'src/app/services/punchdata/punch-service.service';

@Component({
  selector: 'app-serachempcode',
  templateUrl: './serachempcode.component.html',
  styleUrls: ['./serachempcode.component.scss']
})
export class SerachempcodeComponent implements OnInit {

  empForm!: FormGroup; 
  empSearchList: empSearchFace[] = [];
  @Output() empCode = new EventEmitter<string>();
  @ViewChild('xlModal') modalReference: any;
  
  constructor( 
    private punchService: PunchServiceService,
    private modalService: NgbModal
    ){

  }
  ngOnInit(): void {
    this.empForm  = new FormGroup({
      searchtype: new FormControl('1',[Validators.required]),
      inputtxt: new FormControl('', [Validators.required])
    });
  }

  openModal() {

    // on open model 
    this.empSearchList = []
    this.modalService.open(this.modalReference, { size: 'lg' }).result.then(
      // On modal close
      (result) => {
        // call function to set the form vaulue
        this.sendEmpCodeToParent(result)
      },
      // On modal dismissal (clicking outside or pressing Esc)
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
        // Perform actions based on the reason (if needed)
      }
    );

  }

  sendEmpCodeToParent(data: string) {
    this.empCode.emit(data);
  }


  searchEmployee(){
    this.punchService.getEmpSearchList(this.empForm.value).subscribe((response: any)=>{
      if(response.status == 200){
        this.empSearchList = response.Detail
      }
    })
  }
}
