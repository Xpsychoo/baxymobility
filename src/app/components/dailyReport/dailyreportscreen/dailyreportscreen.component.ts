import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DailyReport_EntryType, DailyReport_Model, lineitem } from 'src/app/interfaces/dailyReport.interface';
import { SearchdealercodeComponent } from '../../common/searchdealercode/searchdealercode.component';
import { DailyreportService } from 'src/app/services/dailyReport/dailyreport.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dailyreportscreen',
  templateUrl: './dailyreportscreen.component.html',
  styleUrls: ['./dailyreportscreen.component.scss']
})
export class DailyreportscreenComponent implements OnInit {

  dailyReportForm!: FormGroup;
  lineItemForm!: FormGroup;
  minDate: Date = new Date();
  lineitemrray: lineitem[] = []  // table array for line item
  ModelList: DailyReport_Model[] = []  // table array for model
  EntryTypeList: DailyReport_EntryType[] = []  // table array from EntryType
  editLineForm: boolean = false
  @ViewChild(SearchdealercodeComponent) childComponent!: SearchdealercodeComponent;



  constructor(
    private formBuilder: FormBuilder,
    private dailyReportService: DailyreportService,
    private toaster: ToastrService
    ){}
  ngOnInit(): void {
    this.lineItemForm = this.formBuilder.group({
      ItemLine: [''],
      EntryType: ['', Validators.required],
      ModelName: ['', Validators.required],
      Quantity: ['', Validators.required],
      
    })

    const currentDate = new Date();
    this.dailyReportForm = this.formBuilder.group({
      ReportDate: [currentDate.toISOString().split('T')[0], Validators.required],
      Dealer_Code: ['', Validators.required],
      Visit: ['Yes', Validators.required],
      CollectionAmount: ['', Validators.required],
      itemdata: [[]],
    })
      
    // call model and entryType
    this.loadDailyReportEntryTypeANdModel()
  }

  openDealerCodeModel(){
    this.childComponent.openModal()
  }

  setDealerCode(code: string){
    this.dailyReportForm.get('Dealer_Code')?.setValue(code)
    this.dailyReportForm.get('Dealer_Code')?.updateValueAndValidity();
  }

  updateMinMaxDates() {
    const currentDate = new Date();
    const minDate = new Date(currentDate);

    // Set the minimum date to current date - 2 days  
    minDate.setDate(currentDate.getDate());
    this.minDate = minDate;
  }

  // load entryType
  loadDailyReportEntryTypeANdModel(){
    this.dailyReportService.getEntryTypeData().subscribe((response: any)=>{
      if(response.status == 200){
        this.EntryTypeList = response.Detail
      }else{
        this.toaster.error(response.Message)
        this.EntryTypeList = []
      }
    })

    this.dailyReportService.getModelList().subscribe((response: any)=>{
      if(response.status == 200){
        this.ModelList = response.Detail
      }else{
        this.toaster.error(response.Message)
        this.ModelList = []
      }
    })
  }

  // delete lineItem Entry
  onDeleteLineItem(index: number){
    this.lineitemrray.splice(index,1)
    this.reviseLineItemArray()
  }
  

  //  push lineitemform into array
  saveLineItem(){
    let data = this.lineItemForm.value
    data.ItemLine = this.lineitemrray.length + 1
    this.lineitemrray.push(this.lineItemForm.value)
    this.lineItemForm.reset()
  }

  // reviseItemNumber
  reviseLineItemArray(){
    this.lineitemrray.forEach((item: lineitem, i: number)=> item.ItemLine = i+1)
  }


  // FillLineItemEntry
  onEditFillLineItemFrom(data: lineitem){
    this.lineItemForm.patchValue(data)
    this.editLineForm = true
  }

  //upadateFormlineitem
  UpdateFormValue(){
    this.lineitemrray[this.lineItemForm.get('ItemLine')?.value-1] = this.lineItemForm.value
    this.lineItemForm.reset()
    this.editLineForm = false
  }

  // reset form to add mode
  ResetFormValue(){
    this.lineItemForm.reset()
    this.editLineForm = false
  }

  // saveDaily report data
  saveDailyReportData(){
    this.dailyReportForm.get('itemdata')?.setValue(this.lineitemrray)
    this.dailyReportForm.get('itemdata')?.updateValueAndValidity
    this.dailyReportService.saveDailyReport(this.dailyReportForm.value).subscribe((responce: any)=>{
      if(responce.status == 200){
        this.toaster.success(responce.Message)
        this.lineItemForm.reset()
        this.dailyReportForm.reset()
        this.lineitemrray = []
      }else{
        this.toaster.error(responce.Message)
        this.ModelList = []
      }
    }) 
  }
}
