
import { Component, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { punchPurpose, userItem } from 'src/app/interfaces/punchattandance.inteface';
import { PunchServiceService } from 'src/app/services/punchdata/punch-service.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-punchattendance',
  templateUrl: './punchattendance.component.html',
  styleUrls: ['./punchattendance.component.scss']
})
export class PunchattendanceComponent implements OnInit {
  punchForm!: FormGroup; 
  punchPurposeList: punchPurpose [] = []
  minDate: Date = new Date();
  maxDate: Date = new Date();


  constructor(
    private punchService: PunchServiceService,
    private toastr: ToastrService,
    ){
    
  }
  ngOnInit(): void {

    const currentDate = new Date();
    this.punchForm  = new FormGroup({
      punchpurpose: new FormControl('', [Validators.required]),
      leavetype: new FormControl(''),
      FromPunchdate: new FormControl(currentDate.toISOString().split('T')[0], [Validators.required]),
      ToPunchdate: new FormControl(''),
      ispresent: new FormControl('', [Validators.required]),
      remark: new FormControl(''),
    });

    this.punchForm?.get('punchpurpose')?.valueChanges.subscribe((value) => {
      if (value === 'Leave') {
        this.punchForm?.get('leavetype')?.setValidators([Validators.required]);
        this.punchForm?.get('ToPunchdate')?.setValidators([Validators.required]);
      } else {
        this.punchForm?.get('leavetype')?.clearValidators();
        this.punchForm?.get('ToPunchdate')?.clearValidators();
      }
      this.punchForm?.get('leavetype')?.updateValueAndValidity();
      this.punchForm?.get('ToPunchdate')?.updateValueAndValidity();
    });
 
  

      this.updateMinMaxDates();
      this.punchService.getPunchPurpose().subscribe((response : any)=>{
        if(response.status == 200){
          this.punchPurposeList = response.Detail
        }else{
          this.toastr.error(response.Message)
          this.punchPurposeList  = []
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
    maxDate.setDate(currentDate.getDate() + 20);
    this.maxDate = maxDate;
  }


  onSubmit(){
      // Handle form submission here
      if(!this.punchForm.invalid){
        this.punchService.addAttendanceForm(this.punchForm.value).subscribe((response: any)=>{
          if(response.status == 200){
            this.toastr.success(response.Message)
            this.resetForm()
            this.punchService.punchDataList.emit(true)

          }else{
            this.resetForm()
            this.toastr.error(response.Message)
          }
        })
      }
    }


    resetForm() {
      const currentDate = new Date();
      this.punchForm.reset({
        punchpurpose: '',
        leavetype: '',
        FromPunchdate: currentDate.toISOString().split('T')[0],
        ToPunchdate: '',
        ispresent: '',
        remark: '',
      });
    }
}
