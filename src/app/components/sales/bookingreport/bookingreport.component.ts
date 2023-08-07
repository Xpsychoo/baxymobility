import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { salesbookingreport } from 'src/app/interfaces/sales.interface';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-bookingreport',
  templateUrl: './bookingreport.component.html',
  styleUrls: ['./bookingreport.component.scss']
})
export class BookingreportComponent implements OnInit {

  bookingReportList :  salesbookingreport[] = []
  searchForm!: FormGroup; 
  constructor(private salesService: SalesService, private toaster: ToastrService){

  }
  ngOnInit(): void {
    this.searchForm  = new FormGroup({
      userid: new FormControl(''),
      State: new FormControl(''),
      Zone: new FormControl(''),
      CustomerContactNo: new FormControl(''),
      VehicleModel: new FormControl(''),
      PaymentType: new FormControl(''),
      BookingStatus: new FormControl(''),
      Bookingformdate: new FormControl(new Date().toISOString().split('T')[0].split('-')[0]+"-"+new Date().toISOString().split('T')[0].split('-')[1]+"-"+"01", [Validators.required]),
      Bookingtodate: new FormControl(new Date().toISOString().split('T')[0],  [Validators.required]),
    });
  }


  onSubmit(){
    this.salesService.serachBookingReport(this.searchForm.value).subscribe((responce : any)=>{
      if(responce.status == 200){
          this.bookingReportList = responce.Detail
      }else{
        this.toaster.error(responce.Message)
      }
    })
  }
}
