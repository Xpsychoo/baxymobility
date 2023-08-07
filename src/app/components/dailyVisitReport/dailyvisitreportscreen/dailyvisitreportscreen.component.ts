import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchdealercodeComponent } from '../../common/searchdealercode/searchdealercode.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DailyvisitreporttableComponent } from '../dailyvisitreporttable/dailyvisitreporttable.component';
import { DailyvisitreportService } from 'src/app/services/dailyVisitReport/dailyvisitreport.service';

@Component({
  selector: 'app-dailyvisitreportscreen',
  templateUrl: './dailyvisitreportscreen.component.html',
  styleUrls: ['./dailyvisitreportscreen.component.scss']
})
export class DailyvisitreportscreenComponent implements OnInit {

  minDate: Date = new Date();
  maxDate: Date = new Date();
  dailyvistForm!: FormGroup; 
  @ViewChild(SearchdealercodeComponent) childComponent!: SearchdealercodeComponent;
  @ViewChild(DailyvisitreporttableComponent) dailyvisitrepottableComponent!: DailyvisitreporttableComponent;
  constructor(
    private toastr: ToastrService,
    private dailyVisitReportService: DailyvisitreportService
    ){}
  ngOnInit(): void {

    const currentDate  = new Date()
    this.dailyvistForm  = new FormGroup({
      ReportDate: new FormControl(currentDate.toISOString().split('T')[0], [Validators.required]),
      EntryType: new FormControl('', [Validators.required]),
      Dealer_Code: new FormControl(''),
      VisitType: new FormControl(''),
      Remarks: new FormControl('',[Validators.required]),
    });

    this.dailyvistForm?.get('EntryType')?.valueChanges.subscribe((value) => {
      if (value === 'DVR') {
        this.dailyvistForm?.get('Dealer_Code')?.setValidators([Validators.required]);
        this.dailyvistForm?.get('VisitType')?.setValidators([Validators.required]);
      } else {
        this.dailyvistForm?.get('Dealer_Code')?.setValue('');
        this.dailyvistForm?.get('VisitType')?.setValue('');
        this.dailyvistForm?.get('Dealer_Code')?.clearValidators();
        this.dailyvistForm?.get('VisitType')?.clearValidators();
      }
      this.dailyvistForm?.get('Dealer_Code')?.updateValueAndValidity();
      this.dailyvistForm?.get('VisitType')?.updateValueAndValidity();
    });
    this.updateMinMaxDates()
  }

  onSubmit(){
    this.dailyVisitReportService.addDailyVisitForm(this.dailyvistForm.value).subscribe((responce: any)=>{
      if(responce.status == 200){
        this.toastr.success(responce.Message)
        this.dailyvisitrepottableComponent.onSubmit()
        this.dailyvistForm.reset()
      }else{
        this.toastr.error(responce.Message)
      }
    })
    
  }

  updateMinMaxDates() {
    const currentDate = new Date();
    const minDate = new Date(currentDate);
    const maxDate = new Date(currentDate);

    // Set the minimum date to current date - 2 days
    minDate.setDate(currentDate.getDate() - 2);
    this.minDate = minDate;

    // Set the maximum date to current date + 20 days
    maxDate.setDate(currentDate.getDate());
    this.maxDate = maxDate;
  }

  openDealerCodeModel(){
    this.childComponent.openModal()
  }

  setDealerCode(code: string){
    this.dailyvistForm?.get('Dealer_Code')?.setValue(code);
    this.dailyvistForm?.get('Dealer_Code')?.updateValueAndValidity();

  }
}
