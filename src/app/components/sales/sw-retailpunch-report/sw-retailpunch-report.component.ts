import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { retailPunchList } from 'src/app/interfaces/sales.interface';
import { DownloadexcelService } from 'src/app/services/common/downloadexcel.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-sw-retailpunch-report',
  templateUrl: './sw-retailpunch-report.component.html',
  styleUrls: ['./sw-retailpunch-report.component.scss']
})
export class SwRetailpunchReportComponent implements OnInit {

  retailPunchReportList :  retailPunchList[] = []
  searchForm!: FormGroup; 
  constructor(private salesService: SalesService, 
    private toaster: ToastrService,
    private excelService: DownloadexcelService
    ){

  }
  ngOnInit(): void {
    this.searchForm  = new FormGroup({
      UserId: new FormControl(''),
      ChassisNumber: new FormControl(''),
      MaterialCode: new FormControl(''),
      Receiving_Status: new FormControl(''),
      InvoiceNumber: new FormControl(''),
      formdate: new FormControl("", [Validators.required]),
      todate: new FormControl("",  [Validators.required]),
    });
  }


  onSubmit(){
    this.salesService.serachRetailPunchReport(this.searchForm.value).subscribe((responce : any)=>{
      if(responce.status == 200){
          this.retailPunchReportList = responce.Detail
      }else{
        this.toaster.error(responce.Message)
      }
    })
  }

  getFileData(ChassisNumber: string){
    this.salesService.validateForm22({ChassisNumber}).subscribe((response: any)=>{
      if(response.status === 200){
        this.downloadFile(response.Detail[0].Base64Content)
      }
    })
  }

  downloadFile(Base64Content: string): void {
    const blob = this.salesService.base64ToBlob(Base64Content, 'application/pdf');
    const url = window.URL.createObjectURL(blob);

    // Create a link element and simulate a click to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'downloaded_file.pdf';
    link.click();

    // Release the object URL
    window.URL.revokeObjectURL(url);
  }

  download(){
    this.excelService.downloadExcel(this.retailPunchReportList)
  }
}
