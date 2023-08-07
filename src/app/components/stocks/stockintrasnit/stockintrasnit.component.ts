import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { StockreceivereportService } from 'src/app/services/stocks/stockreceivereport.service';

@Component({
  selector: 'app-stockintrasnit',
  templateUrl: './stockintrasnit.component.html',
  styleUrls: ['./stockintrasnit.component.scss']
})
export class StockintrasnitComponent {
  filterForm: FormGroup;
  reportsList: any = [];
  invoiceItems: any = [];
  @ViewChild('stockInTransit') stockInTransit!: ElementRef;

  userInfoData: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private stockreceivereport: StockreceivereportService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.filterForm = this.formBuilder.group({
      stdate: ['', Validators.required],
      endate: ['', Validators.required],
    });

    this.userInfoData = JSON.parse(this.cookieService.get('userInfo'));
  }

  ngOnInit() {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.filterForm.patchValue({
      stdate: currentDate,
      endate: currentDate
    });
  }

  onSubmit() {
    const { stdate, endate } = this.filterForm.value;
    const reqOptions = { stdate, endate, dlrcode: this.userInfoData.userid };
    this.stockreceivereport.getTransitList(reqOptions).subscribe(
      (response: any) => {
        this.reportsList = response.Detail;
        this.toastr.info(response.Message);
      },
      (error: any) => console.log(error)
    );
  }

  getTransitListItem(item: any) {
    const { InvoiceNumber } = item;
    const reqOptions = { InvoiceNo: InvoiceNumber, dlrcode: this.userInfoData.userid };
    this.stockreceivereport.getInvoiceItemDetails(reqOptions).subscribe(
      (response: any) => {
        this.invoiceItems = response.Detail;
      },
      (error: any) => console.log(error)
    );
    this.modalService.open(this.stockInTransit, { centered: true, backdrop: 'static', size: 'lg' });
  }

  resetForm() {
    this.filterForm.reset({
      stdate: '',
      endate: '',
    });
    this.onSubmit();
  }

}
