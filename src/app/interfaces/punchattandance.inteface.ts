export interface userItem {
    userid?: string,
    punchpurpose: string;
    FromPunchdate: string;
    ToPunchdate: string;
    leavetype: string;
    ispresent: string;
    remark: string;
}


export interface punchPurpose {
    ID: number,
    PurposeName: string
}


export interface punchAttendanceList {
    "User ID": String,
    "Attendance Date": string,
    "Attendance Purpose": string,
    "Leave Type": string,
    Present: string,
    Remarks: string,
    "Submitted Date": string
}

export interface punchAttendanceForm {
    userid?: string,
    Employeecode?: string
    formdate: string,
    todate: string,
}

export interface empSearchFace {
    Usercode: string,
    UserName: string,
    ContactNo: number,
    Email: string,
    City: string,
    State: string,
}

export interface empForm {
    inputtxt: string,
    searchtype: string,
    CreatedBy?: string

}

  