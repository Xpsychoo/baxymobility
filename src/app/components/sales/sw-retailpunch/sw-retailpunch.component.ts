import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SWRetailPunchSideDeatil, states } from 'src/app/interfaces/sales.interface';
import { SalesService } from 'src/app/services/sales/sales.service';
import { SearchbookingcodeComponent } from '../../common/searchbookingcode/searchbookingcode.component';

@Component({
  selector: 'app-sw-retailpunch',
  templateUrl: './sw-retailpunch.component.html',
  styleUrls: ['./sw-retailpunch.component.scss']
})
export class SwRetailpunchComponent implements OnInit {

  searchForm! :FormGroup
  deatilForm!: FormGroup;
  stateList: states[] = []
  showData: boolean = false
  swRespoceText: string = ''
  sideDetail: SWRetailPunchSideDeatil = {
    InvoiceNumber:  '',
    InvoiceDate: '',
    MaterialCode: '',
    MaterialDescrition: ''
  }
  @ViewChild(SearchbookingcodeComponent) childComponent!: SearchbookingcodeComponent;
  constructor(private salesService: SalesService, private toaster: ToastrService ){ }

  ngOnInit(): void {
      this.loadStates()
      this.initDetailForm()
      this.initSerachForm()
  }

  loadStates(){
    this.salesService.getStateList().subscribe((responce: any)=>{
      if(responce.status == 200){
        this.stateList = responce.Detail
      }else{
        this.toaster.error(responce.Message)
      }
    })
  }

  initSerachForm(){
    this.searchForm  = new FormGroup({
      userid: new FormControl(''),
      ChassisNumber: new FormControl('', Validators.required),
      UserId: new FormControl(''),
    });
  }

  initDetailForm(){
    this.deatilForm = new FormGroup({
      userid: new FormControl(''),
      InvoiceNumber: new FormControl('', Validators.required),
      LineItem: new FormControl('', Validators.required),
      MaterialCode: new FormControl('', Validators.required),
      ChassisNumber: new FormControl('', Validators.required),
      EngineNumber: new FormControl('', Validators.required),
      Remarks: new FormControl(''),
      Dealer_Bill_Number: new FormControl('', Validators.required),
      Dealer_Bill_Date: new FormControl('', Validators.required),
      Payment_Type: new FormControl('', Validators.required),
      Financier_name: new FormControl(''),
      Customer_Name: new FormControl('', Validators.required),
      Customer_MobileNo: new FormControl('', Validators.required),
      Customer_AltMobileNo: new FormControl(''),
      Email: new FormControl(''),
      Address_Line1: new FormControl('', Validators.required),
      Address_Line2: new FormControl(''),
      State: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      PinCode: new FormControl('', Validators.required),
      BookingID: new FormControl('',),
      SuperWarranty: new FormControl('', Validators.required),
    });
  }

  onSubmit(){
    this.salesService.saveSWRetailPunch(this.deatilForm.value).subscribe((responce: any)=>{
      if(responce.status == 200){
        this.toaster.success(responce.Message)
        this.resetForm()
      }else{
        this.toaster.error(responce.Message)
      }
    })
    
  }
  
    // open child model
    openModalofChild(){
      this.childComponent.openModal()
    }

    setCode(Code: string){
      this.deatilForm.get('BookingID')?.setValue(Code);
      this.deatilForm.get('BookingID')?.updateValueAndValidity();
    }
  
    submitForm(){
      this.salesService.validatePunchReport(this.searchForm.value).subscribe((responce:any)=>{
        if(responce.status == 200){
          this.showData = responce.Detail[0].Is_OK_Retail_Punch
          this.deatilForm.patchValue(responce.Detail[0])
          this.sideDetail = {...responce.Detail[0]}
          this.swRespoceText = responce.Message
        }else{
          this.initDetailForm()
        }
      })
    }

    resetForm(){
      this.showData = false
      this.initDetailForm()
      this.initSerachForm()
      this.swRespoceText  = ''
      this.sideDetail = { InvoiceNumber: '',
      InvoiceDate: '',
      MaterialCode: '',
      MaterialDescrition: ''}
    }
}
