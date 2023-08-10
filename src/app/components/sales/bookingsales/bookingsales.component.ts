import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {  BookingSalesReportList, ModelData, salesBookingRequest, salesbookingreport } from 'src/app/interfaces/sales.interface';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-bookingsales',
  templateUrl: './bookingsales.component.html',
  styleUrls: ['./bookingsales.component.scss']
})
export class BookingsalesComponent implements OnInit {

  edit: boolean =  false;
  add: boolean = true;
  bookingReportList :  BookingSalesReportList[] = []
  salesBookingForm!: FormGroup; 
  searchForm!: FormGroup; 
  DMSSave_BookingRequest: boolean = this.add
  modelList: ModelData[] = []
  constructor(private salesService: SalesService, private toaster: ToastrService){

  }
  ngOnInit(): void {
    this.initForm();
    this.initSerachForm();
    this.loadModelList();

    
  }

  initSerachForm(){
    this.searchForm  = new FormGroup({
      userid: new FormControl(''),
      State: new FormControl(''),
      Zone: new FormControl(''),
      CustomerContactNo: new FormControl(''),
      VehicleModel: new FormControl(''),
      PaymentType: new FormControl(''),
      BookingStatus: new FormControl(''),
      Bookingformdate: new FormControl('', [Validators.required]),
      Bookingtodate: new FormControl('',  [Validators.required]),
    });
  }
  initForm() {
    this.salesBookingForm = new FormGroup({
      BookingRequestID: new FormControl({value: '', disabled: true}),
      CustomerName: new FormControl('', Validators.required),
      CustomerMobileNo: new FormControl('', Validators.required),
      VehicleModel: new FormControl('', Validators.required),
      DeliveryDate: new FormControl(''),
      PaymentType: new FormControl('', Validators.required),
      FinancierName: new FormControl(''),
      Branch: new FormControl(''),
      isMOU: new FormControl(''),
      FILoginDate: new FormControl(''),
      CIBILDoneDate: new FormControl(''),
      FIDoneDate: new FormControl(''),
      FIPositiveNegative: new FormControl(''),
      FileLoginDate: new FormControl(''),
      IfNotSubmittedReasonforDelay: new FormControl(''),
      LoanAmountApproved: new FormControl(''),
      DownPaymentRCD: new FormControl(''),
      isDOReceived: new FormControl(''),
      DOReceivedDate: new FormControl(''),
      PaymentExpectedDate: new FormControl(''),
      PaymentRCVDDate: new FormControl(''),
      Remarks: new FormControl(''),
      CreateBy: new FormControl(''),
      StatusID: new FormControl({value: '', disabled: true}),
      Status_Remarks: new FormControl({value: '', disabled: true}),
    });
  }

  // loadmodelList
    loadModelList(){
      this.salesService.getmodelListAPI().subscribe((responce:any)=>{
        if(responce.status == 200){
          this.modelList = responce.Detail
        }else{
          this.toaster.error(responce.Message)
        }
      })
    }

  onSearchSubmit(){
    this.salesService.serachBookingReport(this.searchForm.value).subscribe((responce : any)=>{
      if(responce.status == 200){
        this.bookingReportList = []
          this.bookingReportList = responce.Detail
      }else{
        this.bookingReportList = []
      }
    })
  }

  onSubmit(){
    this.salesService.saveDMSAPI(this.salesBookingForm.value, this.DMSSave_BookingRequest).subscribe((responce:any)=>{
      if(responce.status == 200){
        this.toaster.success(responce.Message)
        this.initForm()
        this.DMSSave_BookingRequest = this.add
        this.initSerachForm()
        this.bookingReportList = []
      }else{
        this.toaster.error(responce.Message)
        this.initForm()
      }
    })
  }

  fillUpdateForm(bookingID: number){
    this.DMSSave_BookingRequest = this.edit
    this.salesBookingForm.get('BookingRequestID')?.enable()
    this.salesBookingForm.get('StatusID')?.enable()
    this.salesBookingForm.get('Status_Remarks')?.enable()

    this.salesService.getONeBookingDetail(bookingID).subscribe((responce: any)=>{
      if(responce.status == 200){
          this.salesBookingForm.patchValue(this.transFormDates(responce.Detail[0]))
      }else{
        this.toaster.error(responce.Message)
      }
    })
  }

  resetForm(){
    this.DMSSave_BookingRequest = this.add
    this.initForm()
    this.initSerachForm()
    this.bookingReportList = []
  }

  transFormDates(data: salesBookingRequest){
    data.DeliveryDate = data.DeliveryDate == "" || data.DeliveryDate == null? "":  this.convertmmDDYYYY(data.DeliveryDate)
    data.CIBILDoneDate = data.CIBILDoneDate == "" || data.CIBILDoneDate == null? "" : this.convertmmDDYYYY(data.CIBILDoneDate)
    data.FIDoneDate = data.FIDoneDate == "" || data.FIDoneDate == null ? "" : this.convertmmDDYYYY(data.FIDoneDate)
    data.FILoginDate = data.FILoginDate == "" || data.FILoginDate == null? "" : this.convertmmDDYYYY(data.FILoginDate)
    data.FileLoginDate = data.FileLoginDate == "" || data.FileLoginDate == null? "" : this.convertmmDDYYYY(data.FILoginDate)
    data.DOReceivedDate = data.DOReceivedDate == "" || data.DOReceivedDate == null? "" : this.convertmmDDYYYY(data.DOReceivedDate)
    data.PaymentExpectedDate = data.PaymentExpectedDate == "" || data.PaymentExpectedDate == null? "" : this.convertmmDDYYYY(data.PaymentExpectedDate)
    data.PaymentRCVDDate = data.PaymentRCVDDate == "" || data.PaymentRCVDDate == null? "" : this.convertmmDDYYYY(data.PaymentRCVDDate)
    return data
  }

  convertmmDDYYYY(date: string){
    const currentDate = date.split('/')[2]+"-"+date.split('/')[0]+"-"+date.split('/')[1]
    return currentDate
  }
}

