import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormDataService } from 'src/app/services/jobservices/form-data-service.service';
import { JobsService } from 'src/app/services/jobservices/jobs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createnewjob',
  templateUrl: './createnewjob.component.html',
  styleUrls: ['./createnewjob.component.scss']
})
export class CreatenewjobComponent {
  SearchByChasis: FormGroup;
  vehicleDetails: FormGroup;
  userInfoData: any;
  serviceItemList: any = [];
  partandservicesArr: any[] = [{
    LineItem: 1,
    ServiceType: "",
    ServiceCode: "",
    MRP: "",
    DealerPrice: "",
    SGST: "",
    CGST: "",
    IGST: "",
    TotalPrice: "",
    Quantity: "",
    GTotal: ""
  }];
  partandServicesObj: any = {
    ServiceType: "",
    ServiceCode: "",
    MRP: "",
    DealerPrice: "",
    SGST: "",
    CGST: "",
    IGST: "",
    TotalPrice: "",
    Quantity: "",
    GTotal: ""
  }

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private JobsService: JobsService,
    private toastr: ToastrService,
    public formDataService: FormDataService,
  ) {
    this.SearchByChasis = this.formBuilder.group({
      Chassis_Number: ['', Validators.required],
    });
    this.vehicleDetails = this.formBuilder.group({
      Chassis_Number: ['', Validators.required],
      Item_Code: ['', Validators.required],
      Vehicle_Regn_No: ['', Validators.required],
      Vehicle_Model: ['', Validators.required],
      Year_of_Mfg: ['', Validators.required],
      Engine_No: ['', Validators.required],
      Date_of_Sale: ['', Validators.required],
      kms_covered: ['', Validators.required],
      Customer_Name: ['', Validators.required],
      Customer_Mobile_No: ['', Validators.required],
      Address: ['', Validators.required],
      Warranty_Type: ['', Validators.required],
      service_no: ['', Validators.required],
      job_description: ['', Validators.required],
      Labour_Charges: ['', Validators.required],
      Estimated_repair_Service_Cost: ['', Validators.required],
      Estimated_Delivered_Date: ['', Validators.required],
      Estimated_Delivered_Time: ['', Validators.required],
      BayIn_Time: ['', Validators.required],
      BayIn_Date: ['', Validators.required],
      BayOut_Date: ['', Validators.required],
      BayOut_Time: ['', Validators.required],
      Technician_Name: ['', Validators.required],
      Job_Card_Prepared_by: ['', Validators.required],
      Accessorie_RearViewMirror: [false, Validators.required],
      Accessories_ToolKitJack: [false, Validators.required],
      Accessories_Battery: [false, Validators.required],
      Accessories_Fan: [false, Validators.required],
      Accessories_RubberMats: [false, Validators.required],
      Accessories_SunShield: [false, Validators.required],
      Accessories_SpareWheel: [false, Validators.required],
      Accessories_WheelCase: [false, Validators.required],
      Accessories_AudioSystem: [false, Validators.required],
      Accessories_Fuel: [false, Validators.required],
      Accessories_Quantity: [false, Validators.required],
      DamageifAny: ['', Validators.required],
    });
    this.userInfoData = JSON.parse(this.cookieService.get('userInfo'));
  }

  searchbychasisSubmit() {
    const { Chassis_Number } = this.SearchByChasis.value;
    const reqOptions = { Chassis_Number, userid: this.userInfoData.userid };
    this.JobsService.getjobDatabyChasis(reqOptions).subscribe(
      (response: any) => {
        const datePipe = new DatePipe('en-US'); 
        const formattedDate = datePipe.transform(response.Detail[0].Date_of_Sale, 'yyyy-MM-dd');

        this.vehicleDetails.patchValue({ ...response.Detail[0], Date_of_Sale:formattedDate });
      },
      (error: any) => console.log(error)
    );
  }

  transformtoTrue(value: boolean): string {
    return value ? 'Yes' : 'No';
  }

  addPartListRow() {
    const lastItem = this.partandservicesArr[this.partandservicesArr.length - 1];
    const isValid = lastItem?.Quantity !== "" && lastItem?.ServiceType !== "" && lastItem?.ServiceCode !== "";
    isValid ? this.partandservicesArr.push({ ...this.partandServicesObj, LineItem: this.partandservicesArr.length + 1 }) : this.toastr.error('Please Fill the Required Fields');
  }

  deletePartListRow(index: number) {
    if (index >= 0 && index < this.partandservicesArr.length) {
      this.partandservicesArr.splice(index, 1);
    }
    if (this.partandservicesArr.length === 1) {
      this.partandservicesArr = [{ ...this.partandServicesObj }]
    }
  }

  handleChange(event: any, property: string, item: any, index: number) {
    const inputValue = event.target.value;

    if (property === 'Quantity') {
      let quantityValue = parseInt(inputValue, 10);
      quantityValue = quantityValue >= 0 ? quantityValue : 0;
      this.partandservicesArr[index]['Quantity'] = quantityValue;

      if (item.ServiceCode) {
        this.partandservicesArr[index]['GTotal'] = (item.TotalPrice * this.partandservicesArr[index]['Quantity']).toFixed(2);
      }
    } else {
      this.partandservicesArr[index][property] = inputValue;
    }

    if (property === 'ServiceType') {
      this.getSparePartLabourList(item);
    }

    if (property === 'ServiceCode') {
      this.getSparePartLabourItemDetail(item, index);
    }
  }

  getSparePartLabourList(item: any) {
    const { Item_Code } = this.vehicleDetails.value;
    const reqOptions = {
      ModelCode: Item_Code,
      ServiceType: item.ServiceType,
      userid: this.userInfoData.userid,
      AsonDate: new Date().toLocaleDateString('en-US')
    };
    this.JobsService.getSparePartLabourList(reqOptions).subscribe(
      (response: any) => this.serviceItemList = response.Detail,
      (error: any) => console.log(error)
    );
  }

  getSparePartLabourItemDetail(item: any, index: number) {
    const { Item_Code } = this.vehicleDetails.value;
    const reqOptions = {
      ModelCode: Item_Code,
      ServiceType: item.ServiceType,
      userid: this.userInfoData.userid,
      SpareCode: item.ServiceCode,
      AsonDate: new Date().toLocaleDateString('en-US')
    };
    this.JobsService.getSparePartLabourItemDetail(reqOptions).subscribe(
      (response: any) => {
        this.partandservicesArr[index]['MRP'] = response.Detail[0].MRP;
        this.partandservicesArr[index]['DealerPrice'] = response.Detail[0].DealerPrice;
        this.partandservicesArr[index]['SGST'] = response.Detail[0].SGST;
        this.partandservicesArr[index]['CGST'] = response.Detail[0].CGST;
        this.partandservicesArr[index]['IGST'] = response.Detail[0].IGST;
        this.partandservicesArr[index]['TotalPrice'] = response.Detail[0].TotalPrice;
      },
      (error: any) => console.log(error)
    );
  }

  updateVehicleDetails(vehicleDetails: any): any {
    for (const prop in vehicleDetails) {
      if (vehicleDetails.hasOwnProperty(prop) && typeof vehicleDetails[prop] === 'boolean') {
        vehicleDetails[prop] = vehicleDetails[prop] ? 'Yes' : 'No';
      }
    }
    return vehicleDetails;
  }

  vehicleDetailSubmit() {
    const updatedVehicleDetails = this.updateVehicleDetails(this.vehicleDetails.value);

    const reqOptions = {
      ...this.vehicleDetails.value,
      CreatedBy: this.userInfoData.userid,
      Actual_work_Done: '',
      JobNo: null,
      Status: null,
      Remarks: null,
      PartList: this.partandservicesArr
    };
    if (this.SearchByChasis.value.Chassis_Number) {
      this.JobsService.saveJobRequest(reqOptions).subscribe(
        (response: any) => {
          this.toastr.success('Request Submitted Successfully');
          this.SearchByChasisReset();
          console.log(response);

        },
        (error: any) => console.log(error)
      );
    } else {
      this.toastr.error('Please Fill the form');
    }
  }

  SearchByChasisReset() {
    this.SearchByChasis.reset({
      chasisnumber: '',
    });
    this.vehicleDetails.reset({
      Chassis_Number: '',
      Item_Code: '',
      Vehicle_Regn_No: '',
      Vehicle_Model: '',
      Year_of_Mfg: '',
      Engine_No: '',
      Date_of_Sale: '',
      kms_covered: '',
      Customer_Name: '',
      Customer_Mobile_No: '',
      Address: '',
      Warranty_Type: '',
      service_no: '',
      job_description: '',
      Labour_Charges: '',
      Estimated_repair_Service_Cost: '',
      Estimated_Delivered_Date: '',
      Estimated_Delivered_Time: '',
      BayIn_Time: '',
      BayIn_Date: '',
      BayOut_Date: '',
      BayOut_Time: '',
      Technician_Name: '',
      Job_Card_Prepared_by: '',
      Accessorie_RearViewMirror: false,
      Accessories_ToolKitJack: false,
      Accessories_Battery: false,
      Accessories_Fan: false,
      Accessories_RubberMats: false,
      Accessories_SunShield: false,
      Accessories_SpareWheel: false,
      Accessories_WheelCase: false,
      Accessories_AudioSystem: false,
      Accessories_Fuel: false,
      Accessories_Quantity: false,
      DamageifAny: '',
    });
    this.partandservicesArr = [{ ...this.partandServicesObj, LineItem: 1, }]
  }
}
