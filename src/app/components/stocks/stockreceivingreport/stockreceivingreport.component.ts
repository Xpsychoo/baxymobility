import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { StockreceivereportService } from 'src/app/services/stocks/stockreceivereport.service';

@Component({
  selector: 'app-stockreceivingreport',
  templateUrl: './stockreceivingreport.component.html',
  styleUrls: ['./stockreceivingreport.component.scss'] 
})
export class StockreceivingreportComponent implements OnInit {
  filterForm: FormGroup;
  reportStatusList: any = [];
  reportsList: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private stockreceivereport: StockreceivereportService,
    private cookieService: CookieService,
  ) {
    this.filterForm = this.formBuilder.group({
      ChassisNumber: ['', Validators.required],
      MaterialCode: ['', Validators.required],
      Receiving_Status: ['', Validators.required],
      InvoiceNumber: ['', Validators.required],
      formdate: ['', Validators.required],
      todate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getReportsListStatus();
    this.getstockreceiveReport();
  }

  getReportsListStatus() {
    this.stockreceivereport.getstockreceiveReportStatus().subscribe(
      (response: any) => {
        this.reportStatusList = response.Detail;
      },
      (error: any) => console.log(error)
    );
  }

  getstockreceiveReport() {
    const userInfoData = JSON.parse(this.cookieService.get('userInfo'));
    const reqOptions = { ...this.filterForm.value, UserId: userInfoData.userid };
    this.stockreceivereport.getstockreceiveReport(reqOptions).subscribe(
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
      ChassisNumber: '',
      MaterialCode: '',
      Receiving_Status: '',
      InvoiceNumber: '',
      formdate: '',
      todate: '',
    });
    this.getstockreceiveReport();
  }
}
