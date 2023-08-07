export interface lineitem {
    ItemLine: number,
    EntryType: string,
    ModelName: string,
    Quantity: number
}

export interface dailyreport {
    ReportDate: string,
    Dealer_Code: string,
    Visit: string,
    CollectionAmount: number,
    createdby?: string,
    itemdata: Array<lineitem>
}

export interface dealerSearchFace {
    Customer_Code: string,
    Customer_Name: string,
    MobileNo: number,
    Email: string,
    City: string,
    State: string,
}
export interface DailyReportData {
    "Report Date": string;
    "Dealer Code": string;
    "Dealer Name": string;
    "Visit": string;
    "Collection Amount": number;
    "Entry Type": string;
    "Model Name": string;
    "Quantity": number;
    "Submitted By": string;
    "Submitted Date": string;
}

export interface DailyReport_EntryType {
    "EntyType": string;
}
export interface DailyReport_Model{
    "ModelName": string;
}