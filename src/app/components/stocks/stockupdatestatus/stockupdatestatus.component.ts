import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { StockreceivereportService } from 'src/app/services/stocks/stockreceivereport.service';

interface SelectedItem {
  [key: string]: any;
}


@Component({
  selector: 'app-stockupdatestatus',
  templateUrl: './stockupdatestatus.component.html',
  styleUrls: ['./stockupdatestatus.component.scss']
})

export class StockupdatestatusComponent {
  @ViewChild('formRef', { static: false }) formRef!: NgForm;
  filterForm: FormGroup;
  reportStatusList: any = [];
  reportsList: any = [];
  dealesrList: any = [];
  selectedItem: SelectedItem = {};
  userInfoData: any;

  constructor(
    private formBuilder: FormBuilder,
    private stockreceivereport: StockreceivereportService,
    private toastr: ToastrService,
    private cookieService: CookieService,
  ) {
    this.filterForm = this.formBuilder.group({
      Dealer_Code: ['', Validators.required],
      Receiving_Status: ['', Validators.required],
      Entry_StartDate: ['', Validators.required],
      Entry_EndDate: ['', Validators.required],
    });
    this.userInfoData = JSON.parse(this.cookieService.get('userInfo'));

  }
  

  checkFormtoDisplay() {
    if (Object.keys(this.selectedItem).length) {
      return true;
    } else {
      return false;
    }
  }


  ngOnInit() {
    this.getReportsListStatus();
    this.getstockreceiveReport();
    this.getdealersList();
  }

  getReportsListStatus() {
    this.stockreceivereport.getstockreceiveReportStatus().subscribe(
      (response: any) => {
        this.reportStatusList = response.Detail;
      },
      (error: any) => console.log(error)
    );
  }

  getdealersList() {
    this.stockreceivereport.getdealersList().subscribe(
      (response: any) => {
        this.dealesrList = response.Detail;
      },
      (error: any) => console.log(error)
    );
  }

  getstockreceiveReport() {
    const userInfoData = JSON.parse(this.cookieService.get('userInfo'));
    const reqOptions = { ...this.filterForm.value, userid: userInfoData.userid };
    this.stockreceivereport.updatedstockreceiveList(reqOptions).subscribe(
      (response: any) => (this.reportsList = response.Detail),
      (error: any) => console.log(error)
    );
  }

  onSubmit() {
    this.getstockreceiveReport();
  }

  validUrl(data: any) {
    if (data.includes('jpg') || data.includes('jpeg') || data.includes('pdf') || data.includes('png')) {
      return `<a href="${data}" target="_blank">View File</a>`;
    }
    return '';
  }

  resetForm() {
    this.filterForm.reset({
      Dealer_Code: '',
      Receiving_Status: '',
      Entry_StartDate: '',
      Entry_EndDate: ''
    });
    this.getstockreceiveReport();
  }

  selectItem(item: any) {
    this.selectedItem = item;    
    console.log(item);
    
  }
  changeHandler(event: any) {
    let obj: SelectedItem = { ...this.selectedItem };
    const { name, value } = event.target as HTMLInputElement;
    obj[name] = value;
    this.selectedItem = { ...this.selectedItem, ...obj };
  }

  resetUpdateForm() {
    this.formRef.resetForm();
    this.selectedItem = {};
  }
  updateHandler() {
    const currentItems = { ...this.selectedItem }
    const reqOptions = {
      InvoiceNumber: currentItems['InvoiceNumber'],
      Receiving_Status: currentItems['Receiving_Status'],
      Remarks: currentItems['Remarks'],
      userid: this.userInfoData.userid,
      MaterialCode: currentItems['MaterialCode'],
      ChassisNumber: currentItems['ChassisNumber'],
      EngineNumber: currentItems['EngineNumber'],
      LineItem: currentItems['LineItem'],
    };
    this.stockreceivereport.updatedstockreceiveDetail(reqOptions).subscribe(
      (response: any) => {
        this.toastr.info(response.Message);
        this.resetUpdateForm();
      },
      (error: any) => console.log(error)
    );
  }
}
