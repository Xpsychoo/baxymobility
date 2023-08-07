import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormDataService {
    radioOptions = [
        { value: 'Within Warranty', id: 'Within_Warranty', label: 'Within Warranty' },
        { value: 'Privilege', id: 'Privilege', label: 'Privilege' },
        { value: 'Suraksha/AMC', id: 'Suraksha_AMC', label: 'Suraksha/AMC' },
        { value: 'Paid Service', id: 'Paid_Service', label: 'Paid Service' },
        { value: 'Accident Job', id: 'Accident_Job', label: 'Accident Job' }
    ];

    accessories = [
        { formControlName: 'Accessorie_RearViewMirror', id: 'Accessorie_RearViewMirror', label: 'Rear View Mirror' },
        { formControlName: 'Accessories_ToolKitJack', id: 'Accessories_ToolKitJack', label: 'Tool Kit & Jack' },
        { formControlName: 'Accessories_Battery', id: 'Accessories_Battery', label: 'Battery' },
        { formControlName: 'Accessories_Fan', id: 'Accessories_Fan', label: 'Fan' },
        { formControlName: 'Accessories_RubberMats', id: 'Accessories_RubberMats', label: 'Rubber Mats' },
        { formControlName: 'Accessories_SunShield', id: 'Accessories_SunShield', label: 'Sun Shield' },
        { formControlName: 'Accessories_SpareWheel', id: 'Accessories_SpareWheel', label: 'Spare Wheel' },
        { formControlName: 'Accessories_WheelCase', id: 'Accessories_WheelCase', label: 'Wheel Case' },
        { formControlName: 'Accessories_AudioSystem', id: 'Accessories_AudioSystem', label: 'Audio System' },
        { formControlName: 'Accessories_Fuel', id: 'Accessories_Fuel', label: 'Fuel' },
        { formControlName: 'Accessories_Quantity', id: 'Accessories_Quantity', label: 'Quantity' },
    ];

    formFields = [
        { type: 'text', id: 'Labour_Charges', formControlName: 'Labour_Charges', label: 'Labour Charges', placeholder: 'Enter Labour Charges' },
        { type: 'number', id: 'Estimated_repair_Service_Cost', formControlName: 'Estimated_repair_Service_Cost', label: 'Estimated Repair Cost (Rs)', placeholder: 'Enter Estimated Repair Cost' },
        { type: 'date', id: 'Estimated_Delivered_Date', formControlName: 'Estimated_Delivered_Date', label: 'Estimated Delivered Date', placeholder: 'Enter Chasis number' },
        { type: 'time', id: 'Estimated_Delivered_Time', formControlName: 'Estimated_Delivered_Time', label: 'Estimated Delivered Time', placeholder: 'Enter Chasis number' },
        { type: 'date', id: 'BayIn_Date', formControlName: 'BayIn_Date', label: 'Bay In Date', placeholder: '' },
        { type: 'time', id: 'BayIn_Time', formControlName: 'BayIn_Time', label: 'Bay In Time', placeholder: '' },
        { type: 'date', id: 'BayOut_Date', formControlName: 'BayOut_Date', label: 'Bay Out Date', placeholder: '' },
        { type: 'time', id: 'BayOut_Time', formControlName: 'BayOut_Time', label: 'Bay Out Time', placeholder: '' },
        { type: 'text', id: 'Technician_Name', formControlName: 'Technician_Name', label: 'Technician Name', placeholder: 'Enter Technician Name' },
        { type: 'text', id: 'Job_Card_Prepared_by', formControlName: 'Job_Card_Prepared_by', label: 'Job Card Prepared by', placeholder: 'Enter Job Card Prepared by' }
    ];

    vehicleformFields = [
        { type: 'text', id: 'Chassis_Number', formControlName: 'Chassis_Number', label: 'Chasis Number', placeholder: 'Enter Chasis number' },
        { type: 'text', id: 'Item_Code', formControlName: 'Item_Code', label: 'Material Code', placeholder: 'Enter Material Code' },
        { type: 'text', id: 'Vehicle_Regn_No', formControlName: 'Vehicle_Regn_No', label: 'Vehicle Regn No', placeholder: 'Enter Vehicle Regn No' },
        { type: 'text', id: 'Vehicle_Model', formControlName: 'Vehicle_Model', label: 'Vehicle Model', placeholder: 'Enter Vehicle Model' },
        { type: 'number', id: 'Year_of_Mfg', formControlName: 'Year_of_Mfg', label: 'Year of Mfg', placeholder: 'YYYY', min: 1800, max: 2023 },
        { type: 'text', id: 'Engine_No', formControlName: 'Engine_No', label: 'Engine No.', placeholder: 'Enter Engine No.' },
        { type: 'date', id: 'Date_of_Sale', formControlName: 'Date_of_Sale', label: 'Date of Sale', placeholder: 'Enter Date of Sale' },
        { type: 'number', id: 'kms_covered', formControlName: 'kms_covered', label: 'Kms. Covered', placeholder: 'Enter Kms. Covered' },
    ];
}