import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { salesbookingreport } from 'src/app/interfaces/sales.interface';
import { DownloadexcelService } from 'src/app/services/common/downloadexcel.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-bookingreport',
  templateUrl: './bookingreport.component.html',
  styleUrls: ['./bookingreport.component.scss']
})
export class BookingreportComponent implements OnInit {

  bookingReportList :  salesbookingreport[] = []
  searchForm!: FormGroup; 
  @ViewChild('table', {static: false}) tableRef!: ElementRef
  constructor(private salesService: SalesService, 
    private toaster: ToastrService,  
    private excelService: DownloadexcelService){

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
        this.bookingReportList = []
      }
    })
  }

  download(){
    this.excelService.downloadExcel(this.tableRef)
   }
}
