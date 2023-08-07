import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dealerSearchFace } from 'src/app/interfaces/dailyReport.interface';
import { BookingRequest } from 'src/app/interfaces/sales.interface';
import { BookingcodeService } from 'src/app/services/booking/bookingcode.service';

@Component({
  selector: 'app-searchbookingcode',
  templateUrl: './searchbookingcode.component.html',
  styleUrls: ['./searchbookingcode.component.scss']
})
export class SearchbookingcodeComponent {


  dealerForm!: FormGroup; 
  bookingRequestList: BookingRequest[] = [];
  @Output() bookingCode = new EventEmitter<string>();
  @ViewChild('xlModal') modalReference: any;
  
  constructor( 
    private bookingService: BookingcodeService,
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
    this.bookingRequestList = []
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
    this.bookingCode.emit(data);
  }


  searchEmployee(){
    this.bookingService.getBookingSearchList(this.dealerForm.value).subscribe((response: any)=>{
      if(response.status == 200){
        this.bookingRequestList = response.Detail
      }else{
        this.bookingRequestList = []
      }
    })
  }
}
