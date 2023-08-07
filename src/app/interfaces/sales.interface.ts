export interface salesbookingreport {
    Sl: number;
    ASM_RM: string;
    State: string;
    Zone: string;
    DealerName: string;
    DealerLocation: string;
    CustomerName: string;
    CustomerContactNo: string;
    VehicleModel: string;
    VehicleDeliveryDate: string | null;
    CashOrFinance: string;
    FinancierName: string;
    Branch: string;
    MOU: string;
    FILoginDate: string | null;
    CIBILDoneDate: string | null;
    FIDoneDate: string | null;
    FIPositiveOrNegative: string;
    FileLoginDate: string | null;
    ReasonForDelay: string;
    LoanAmountApproved: number;
    DownPaymentRCD: number;
    DORcvdYesOrNo: string;
    DORcvdDate: string | null;
    PaymentExpectedDate: string | null;
    PaymentRcvdDate: string | null;
    Remarks: string;
    BookingStatus: string;
    BookingRemarks: string;
    CreatedDate: string;
    UpdatedDate: string | null;
}

export interface bookingreportSearchForm {
    userid?: string;
    State: string;
    Zone: string;
    CustomerContactNo: string;
    VehicleModel: string;
    PaymentType: string;
    BookingStatus: string;
    Bookingformdate: string;
    Bookingtodate: string;
}

export interface retailPunchSearch {
    UserId: string;
    ChassisNumber: string;
    MaterialCode: string;
    Receiving_Status: string;
    InvoiceNumber: string;
    formdate: string;
    todate: string;
}

export interface retailPunchList {
    ID: number;
    InvoiceNumber: string;
    LineItem: string;
    MaterialCode: string;
    ChassisNumber: string;
    EngineNumber: string;
    Remarks: string;
    Dealer_Bill_Number: string;
    Dealer_Bill_Date: string;
    Payment_Type: string;
    Financier_name: string;
    Customer_Name: string;
    Customer_MobileNo: string;
    Customer_AltMobileNo: string;
    Email: string;
    Address_Line1: string;
    Address_Line2: string;
    State: string;
    City: string;
    PinCode: string;
    CreatedBy: string;
    CreatedDate: string;
    Form22_Released: string;
}

export interface ModelData {
    ModelCode: string;
    ModelDesc: string;
}
  
export interface salesBookingRequest {
    BookingRequestID?: string;
    CustomerName: string;
    CustomerMobileNo: string;
    VehicleModel: string;
    DeliveryDate: string;
    PaymentType: string;
    FinancierName: string;
    Branch: string;
    isMOU: string;
    FILoginDate: string;
    CIBILDoneDate: string;
    FIDoneDate: string;
    FIPositiveNegative: string;
    FileLoginDate: string;
    IfNotSubmittedReasonforDelay: string;
    LoanAmountApproved: string;
    DownPaymentRCD: string;
    isDOReceived: string;
    DOReceivedDate: string;
    PaymentExpectedDate: string;
    PaymentRCVDDate: string;
    Remarks: string;
    CreateBy: string;
    StatusID: string;
    Status_Remarks: string;
    
}

export interface BookingSalesReportList {
    Sl: number;
    "ASM/RM": string;
    State: string;
    Zone: string;
    "Dealer Name": string;
    "Dealer Location": string;
    "Customer Name": string;
    "Customer Contact No.": string;
    "Vehicle Model": string;
    "Vehicle Delivery Date": string;
    "Cash/Finance": string;
    "Financier Name": string;
    Branch: string;
    MOU: string;
    "FI Login date": string;
    "CIBIL Done Date": string;
    "FI Done Date": string;
    "FI Positive/ Negative": string;
    "File Login Date": string;
    "If Not Submitted, Reason for Delay": string;
    "Loan Amount Approved": number;
    "Down Payment RCD": number;
    "D.O. Received Yes/No": string;
    "D.O. Received Date": string;
    "Payment Expected Date": string;
    "Payment RCVD Date": string | null;
    Remarks: string;
    "Booking Status": string;
    "Booking Remarks": string | null;
    "Created Date": string;
    "Updated Date": string | null;
  }

  export interface states {
    "State_Name" : string;
  }

  export interface validateChassis {
    "ChassisNumber" : string;
    "userid"?: string;
    "UserId"?: string;
  }

  export interface SWRetailPunchForm {
    userid?: string;
    InvoiceNumber: string;
    LineItem: string;
    MaterialCode: string;
    ChassisNumber: string;
    EngineNumber: string;
    Remarks: string;
    Dealer_Bill_Number: string;
    Dealer_Bill_Date: string;
    Payment_Type: string;
    Financier_name: string;
    Customer_Name: string;
    Customer_MobileNo: string;
    Customer_AltMobileNo: string;
    Email: string;
    Address_Line1: string;
    Address_Line2: string;
    State: string;
    City: string;
    PinCode: string;
    BookingID: string;
    SuperWarranty: string;
}

export interface SWRetailPunchSideDeatil {
    InvoiceNumber: string;
    InvoiceDate: string;
    MaterialCode: string;
    MaterialDescrition: string; 
}



export interface BookingRequest {
    BookingRequestID: number;
    CustomerName: string;
    CustomerMobileNo: string;
    VehicleModel: string;
    DeliveryDate: string;
    PaymentType: string;
    FinancierName: string;
    Branch: string;
    isMOU: string;
    FILoginDate: string | null;
    CIBILDoneDate: string | null;
    FIDoneDate: string | null;
    FIPositiveNegative: string;
    FileLoginDate: string | null;
    IfNotSubmittedReasonforDelay: string;
    LoanAmountApproved: number;
    DownPaymentRCD: number;
    isDOReceived: string;
    DOReceivedDate: string | null;
    PaymentExpectedDate: string | null;
    PaymentRCVDDate: string | null;
    Remarks: string;
  }

export interface chassieformInfo {
    ChassisNumber: string;
    Base64Content: string;
    FileExtName: string;
    CreatedBy: string;
    MessageRemarks: string;
    isVisible: number;
}

export interface chassieform {
    ChassisNumber: string;
    Base64Content: string;
    fileUpload?: HTMLInputElement
    FileExtName: string;
    CreatedBy: string;
}


  
  

  
  