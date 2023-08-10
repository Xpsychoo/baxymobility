import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormDataService } from 'src/app/services/jobservices/form-data-service.service';
import { JobsService } from 'src/app/services/jobservices/jobs.service';

@Component({
  selector: 'app-jobupdate',
  templateUrl: './jobupdate.component.html',
  styleUrls: ['./jobupdate.component.scss']
})
export class JobupdateComponent {
  filterForm: FormGroup;
  vehicleDetails: FormGroup;
  serviceItemList: any = [];
  isFieldDisabled:boolean =false;
  jobRequestList: any = [];
  initialSparePartList: any = [];
  userInfoData: any;
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
    private toastr: ToastrService,
    private cookieService: CookieService,
    private JobsService: JobsService,
    public formDataService: FormDataService
  ) {
    this.filterForm = this.formBuilder.group({
      Chassis_Number: ['', Validators.required],
      JobID: ['', Validators.required],
      Customer_Name: ['', Validators.required],
      Customer_Mobile_No: ['', Validators.required]
    });
    this.vehicleDetails = this.formBuilder.group({
      Chassis_Number: [''],
      Item_Code: [''],
      Vehicle_Regn_No: [''],
      Vehicle_Model: [''],
      Year_of_Mfg: [''],
      Engine_No: [''],
      Date_of_Sale: [''],
      Kms_Covered: [''],
      Customer_Name: [''],
      Customer_Mobile_No: [''],
      Address: [''],
      Warranty_Type: [''],
      ServiceNo: [''],
      Job_Description: [''],
      Actual_work_Done: [''],
      JobNo: [''],
      Labour_Charges: [''],
      Estimated_repair_Service_Cost: [''],
      Estimated_Delivered_Date: [''],
      Estimated_Delivered_Time: [''],
      BayIn_Time: [''],
      BayIn_Date: [''],
      BayOut_Date: [''],
      BayOut_Time: [''],
      Technician_Name: [''],
      Job_Card_Prepared_by: [''],
      Accessorie_RearViewMirror: [false],
      Accessories_ToolKitJack: [false],
      Accessories_Battery: [false],
      Accessories_Fan: [false],
      Accessories_RubberMats: [false],
      Accessories_SunShield: [false],
      Accessories_SpareWheel: [false],
      Accessories_WheelCase: [false],
      Accessories_AudioSystem: [false],
      Accessories_Fuel: [false],
      Accessories_Quantity: [false],
      DamageifAny: [''],
      Remarks: [''],
    });
    this.userInfoData = JSON.parse(this.cookieService.get('userInfo'));
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

  filterSubmit() {
    const reqOptions = { ...this.filterForm.value, userid: this.userInfoData.userid }
    this.JobsService.getjobRequestList(reqOptions).subscribe(
      (response: any) => this.jobRequestList = response.Detail,
      (error: any) => console.log(error)
    );
  }

  handleChange(event: any, property: string, item: any, index: number) {
    const inputValue = event.target.value;

    switch (property) {
      case 'Quantity':
        const quantityValue = Math.max(parseInt(inputValue, 10), 0);
        this.partandservicesArr[index]['Quantity'] = quantityValue;
        if (item.ServiceCode) {
          this.partandservicesArr[index]['GTotal'] = (item.TotalPrice * quantityValue).toFixed(2);
        }
        break;

      case 'ServiceType':
        this.partandservicesArr[index][property] = inputValue;
        this.getSparePartLabourList(item);
        break;

      case 'ServiceCode':
        this.partandservicesArr[index][property] = inputValue;
        this.getSparePartLabourItemDetail(item, index);
        break;

      default:
        this.partandservicesArr[index][property] = inputValue;
        break;
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

    const handleResponse = (response: any) => {
      const { Detail } = response;
      const partandservicesItem = this.partandservicesArr[index];
      ['MRP', 'DealerPrice', 'SGST', 'CGST', 'IGST', 'TotalPrice'].forEach(key => {
        partandservicesItem[key] = Detail[0][key];
      });
    };

    this.JobsService.getSparePartLabourItemDetail(reqOptions).subscribe(
      handleResponse,
      (error: any) => console.log(error)
    );
  }

  getSparePartinitList(id: any) {
    const reqOptions = { JobID: id, Request_Stage: "Actual observation" };
    this.JobsService.getSparePartinitList(reqOptions).subscribe(
      (response: any) => {
        if (response.Detail) {
          this.partandservicesArr = [...response.Detail, { ...this.partandServicesObj }]
        } else {
          this.partandservicesArr = [{ ...this.partandServicesObj, LineItem: 1 }];
        }
      },
      (error: any) => console.log(error)
    );
  }

  formatedDate(date: any) {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate;
  }

  formatedTime(time: any) {
    const timeString = time;
    const [timePart, meridiem] = timeString.split(' ');
    const [hours, minutes] = timePart.split(':');
    let formattedTime = `${hours}:${minutes}`;

    if (meridiem === 'PM' && hours !== '12') {
      const militaryHours = parseInt(hours, 10) + 12;
      formattedTime = `${militaryHours}:${minutes}`;
    }
    return formattedTime;
  }

  selectItem(item: any) {
    const formattedDate = (date: string) => this.formatedDate(date);
    const formattedTime = (time: string) => this.formatedTime(time);

    const booleanProperties = [
      'Accessorie_RearViewMirror',
      'Accessories_AudioSystem',
      'Accessories_Battery',
      'Accessories_Fan',
      'Accessories_Fuel',
      'Accessories_ToolKitJack',
      'Accessories_RubberMats',
      'Accessories_SunShield',
      'Accessories_SpareWheel',
      'Accessories_WheelCase',
      'Accessories_Quantity',
    ];

    const updatedItem: any = {
      ...item,
      Date_of_Sale: formattedDate(item.Date_of_Sale),
      BayOut_Time: formattedTime(item.BayOut_Time),
      BayOut_Date: formattedDate(item.BayOut_Date),
      BayIn_Time: formattedTime(item.BayIn_Time),
      BayIn_Date: formattedDate(item.BayIn_Date),
      Estimated_Delivered_Date: formattedDate(item.Estimated_Delivered_Date),
      Estimated_Delivered_Time: formattedTime(item.Estimated_Delivered_Time),
    };

    booleanProperties.forEach((prop) => {
      updatedItem[prop] = item[prop] === 'Yes';
    });

    this.vehicleDetails.patchValue(updatedItem);
    this.getSparePartinitList(item.JobNo);
    this.isFieldDisabled = true;
  }


  vehicleDetailSubmit() {
    const reqOptions = {
      ...this.updateVehicleDetails(this.vehicleDetails.value),
      CreatedBy: this.userInfoData.userid,
      Status: '11',
      PartList: this.partandservicesArr
    };

    this.JobsService.updateJobRequest(reqOptions).subscribe(
      ({ Message }: any) => {
        this.toastr.success(Message);
        this.resetForm();
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

  resetForm() {
    this.filterForm.reset({
      Chassis_Number: '',
      JobID: '',
      Customer_Name: '',
      Customer_Mobile_No: '',
    });
    this.vehicleDetails.reset({
      Chassis_Number: '',
      JobNo: '',
      Item_Code: '',
      Vehicle_Regn_No: '',
      Vehicle_Model: '',
      Year_of_Mfg: '',
      Engine_No: '',
      Date_of_Sale: '',
      Kms_Covered: '',
      Customer_Name: '',
      Customer_Mobile_No: '',
      Address: '',
      Warranty_Type: '',
      ServiceNo: '',
      Job_Description: '',
      Actual_work_Done: '',
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
      Remarks: '',
    });
  }
}
