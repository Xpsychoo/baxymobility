export interface DailyVisitReportForm {
    "ReportDate": string;
    "EntryType": string;
    "Dealer_Code": string;
    "VisitType": string;
    "Remarks": string;
    "createdby": string;
  }
  
  export interface DealerVisitReport {
    "Report Date": string;
    "Entry Type": string;
    "Dealer Code": string;
    "Dealer Name": string;
    "VisitType": string;
    "Remarks": string;
    "Submitted By": string;
    "Submitted Date": string;
  }

  export interface DailyEmpVisitReportList {
    RVid: number;
    "Report Date": string;
    EntryType: string;
    "Dealer Code": string;
    "Dealer Name": string;
    VisitType: string;
    Remarks: string;
    "Submitted By": string;
    "Submitted Date": string;
  }
  