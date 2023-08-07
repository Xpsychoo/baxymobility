import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dealerSearchFace } from 'src/app/interfaces/dailyReport.interface';
import { DealerscodeService } from 'src/app/services/dealersdata/dealerscode.service';

@Component({
  selector: 'app-searchdealercode',
  templateUrl: './searchdealercode.component.html',
  styleUrls: ['./searchdealercode.component.scss']
})
export class SearchdealercodeComponent {


  dealerForm!: FormGroup; 
  dealerSearchList: dealerSearchFace[] = [];
  @Output() dealerCode = new EventEmitter<string>();
  @ViewChild('xlModal') modalReference: any;
  
  constructor( 
    private dealerService: DealerscodeService,
    private modalService: NgbModal
    ){

  }
  ngOnInit(): void {
    this.dealerForm  = new FormGroup({
      searchtype: new FormControl('1',[Validators.required]),
      inputtxt: new FormControl('', [Validators.required])
    });
  }

  openModal() {
    // on open model 
    this.dealerSearchList = []
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
    this.dealerCode.emit(data);
  }


  searchEmployee(){
    this.dealerService.getDealerCodeSearchList(this.dealerForm.value).subscribe((response: any)=>{
      if(response.status == 200){
        this.dealerSearchList = response.Detail
      }else{
        this.dealerSearchList = []
      }
    })
  }

}
