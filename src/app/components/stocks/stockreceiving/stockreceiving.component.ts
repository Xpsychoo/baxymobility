import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { StockreceivereportService } from 'src/app/services/stocks/stockreceivereport.service';

interface SelectedItem {
  [key: string]: any;
}

@Component({
  selector: 'app-stockreceiving',
  templateUrl: './stockreceiving.component.html',
  styleUrls: ['./stockreceiving.component.scss']
})

export class StockreceivingComponent {
  @ViewChild('formRef', { static: false }) formRef!: NgForm;
  filterForm: FormGroup;
  reportsList: any = [];
  userInfoData: any;
  selectedItem: SelectedItem = {};
  reportStatusList: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private stockreceivereport: StockreceivereportService,
    private toastr: ToastrService,
  ) {
    this.filterForm = this.formBuilder.group({
      InvoiceNumber: ['', Validators.required],
    });
    this.userInfoData = JSON.parse(this.cookieService.get('userInfo'));
  }

  ngOnInit() {
    this.getReportsListStatus();
  }

  onSubmit() {
    const { InvoiceNumber } = this.filterForm.value;
    const reqOptions = { InvoiceNo: InvoiceNumber, dlrcode: this.userInfoData.userid };
    this.stockreceivereport.getInvoiceItemDetails(reqOptions).subscribe(
      (response: any) => {
        this.reportsList = response.Detail;
        this.toastr.info(response.Message);
      },
      (error: any) => console.log(error)
    );
  }
  getReportsListStatus() {
    this.stockreceivereport.getstockreceiveReportStatus().subscribe(
      (response: any) => {
        this.reportStatusList = response.Detail;
      },
      (error: any) => console.log(error)
    );
  }

  updateHandler() {
    const reqOptions = {
      InvoiceNumber: this.selectedItem['InvoiceNumber'],
      MaterialCode: this.selectedItem['Item_Code'],
      ChassisNumber: this.selectedItem['CHASIS_NUMBER'],
      EngineNumber: this.selectedItem['ENGINE_NUMBER'] || '',
      Attachment1_FileName: this.selectedItem['Attachment1_FileName'] || '',
      Attachment1_Name: this.selectedItem['Attachment1_Name'] || null,
      Attachment2_FileName: this.selectedItem['Attachment2_FileName'] || '',
      Attachment2_Name: this.selectedItem['Attachment2_Name'] || null,
      Attachment3_FileName: this.selectedItem['Attachment3_FileName'] || '',
      Attachment3_Name: this.selectedItem['Attachment3_Name'] || '',
      Receiving_Status: this.selectedItem['Receiving_Status'],
      Remarks: this.selectedItem['Remarks'] || '',
      MissedItems: '',
      Quantity: this.selectedItem['Qty'],
      LineItem: this.selectedItem['SNo'],
      MaterialDescrition: this.selectedItem['Description_of_Goo'],
    };

    this.stockreceivereport.updateTransitListItem(reqOptions).subscribe(
      (response: any) => {
        this.toastr.info(response.Message);
        this.resetUpdateForm();
      },
      (error: any) => console.log(error)
    );
  }


  async changeHandler(event: any, type: number) {
    const { name, id, files, value } = event.target as HTMLInputElement;
    const obj: SelectedItem = { ...this.selectedItem };

    if (type === 1 && files) {
      const base64String = await this.readAsBase64(files[0]);
      const fileExtension = files[0].name.split('.').pop();
      obj[name] = base64String;
      obj[id] = `.${fileExtension}`;
    } else {
      obj[name] = value;
    }
    this.selectedItem = { ...this.selectedItem, ...obj };
  }

  async readAsBase64(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const base64String = this.getStringAfterComma(base64data);
        resolve(base64String || ''); // Convert null to an empty string
      };
      reader.readAsDataURL(file);
    });
  }

  getStringAfterComma(inputString: string): string | null {
    const parts = inputString.split(',');
    return parts.length <= 1 ? null : parts.slice(1).join(',');
  }


  checkFormtoDisplay() {
    if (Object.keys(this.selectedItem).length) {
      return true;
    } else {
      return false;
    }
  }

  resetUpdateForm() {
    this.formRef.resetForm();
    this.selectedItem = {};
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }
}
