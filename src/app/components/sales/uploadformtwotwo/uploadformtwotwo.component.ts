import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { chassieformInfo } from 'src/app/interfaces/sales.interface';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-uploadformtwotwo',
  templateUrl: './uploadformtwotwo.component.html',
  styleUrls: ['./uploadformtwotwo.component.scss']
})
export class UploadformtwotwoComponent implements OnInit{

  searchForm! : FormGroup
  uploadForm! : FormGroup
  form22Data: chassieformInfo = { 
    ChassisNumber: '',
    Base64Content : '',
    FileExtName : '',
    CreatedBy: '',
    MessageRemarks: '',
    isVisible:  0
}
  Message: string = ''
  constructor(private salesService: SalesService, private toaster: ToastrService){}
  ngOnInit(): void {
      this.initSerachForm()
      this.inituploadForm()
  }

  initSerachForm(){
    this.searchForm  = new FormGroup({
      userid: new FormControl(''),
      ChassisNumber: new FormControl('', Validators.required),
      UserId: new FormControl(''),
    });
  }

  inituploadForm(){
    this.uploadForm  = new FormGroup({
      ChassisNumber: new FormControl(''),
      Base64Content: new FormControl('', Validators.required),
      fileUpload: new FormControl(''),
      FileExtName: new FormControl(''),
      CreatedBy: new FormControl(''),
    });
  }

  checkChassie(){
    this.salesService.validateForm22(this.searchForm.value).subscribe((response: any)=>{

      if(response.status == 200){
        this.Message = response.Message
        if(response.Detail[0].isVisible !== 0){
            this.form22Data = response.Detail[0]
        }
      }
      
    })
  }
  
  async onFileChange(event: any) {
    const { name, id, files, value } = event.target as HTMLInputElement;

    
    if (files) {
      const base64String = await this.readAsBase64(files[0]);
      const fileExtension = "."+files[0].name.split('.').pop();
      this.uploadForm.get('Base64Content')?.setValue(base64String)
      this.uploadForm.get('FileExtName')?.setValue(fileExtension)
      this.uploadForm.get('ChassisNumber')?.setValue(this.form22Data.ChassisNumber)
    }
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

  uploadFrom(){
    this.salesService.saveFrom22(this.uploadForm.value).subscribe((response: any)=>{
      if(response.status == 200){
        this.toaster.success(response.Message)
        this.Message = response.Message
        this.inituploadForm()
      }else{
        this.toaster.error(response.Message)
      }
    })
  }

  downloadFile(): void {
    const blob = this.salesService.base64ToBlob(this.form22Data.Base64Content, 'application/pdf');
    const url = window.URL.createObjectURL(blob);

    // Create a link element and simulate a click to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'downloaded_file.pdf';
    link.click();

    // Release the object URL
    window.URL.revokeObjectURL(url);
  }



  resetForm(){
    this.inituploadForm()
    this.initSerachForm()
    this.Message  = ''
    this.form22Data = {
      ChassisNumber: '',
      Base64Content : '',
      FileExtName : '',
      CreatedBy: '',
      MessageRemarks: '',
      isVisible:  0
  }
    
  }

}
