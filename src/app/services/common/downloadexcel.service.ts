import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DownloadexcelService {

  constructor() { }

  downloadExcel(excelData: Array<any>): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Set header style (bold)
    const headerStyle = { font: { bold: true } };
    if (ws['!ref']) {
      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell = XLSX.utils.encode_cell({ r: 0, c: col });
        ws[cell].s = headerStyle;
      }
    }

    // Apply alternating column styles
    this.applyAlternatingStyles(ws, excelData.length);

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    // Write the Excel file and trigger download
    XLSX.writeFile(wb, 'output.xlsx');
  }

  private applyAlternatingStyles(ws: XLSX.WorkSheet, lastRow: number): void {
    const grayCellStyle = { fill: { fgColor: { rgb: 'DDDDDD' } } };
    const whiteCellStyle = { fill: { fgColor: { rgb: 'FFFFFF' } } };
    let isGray = false;

    for (let row = 1; row <= lastRow; row++) {
      for (const col in ws) {
        if (col.startsWith('A' + row + ':Z' + row)) {
          ws[col].s = isGray ? grayCellStyle : whiteCellStyle;
        }
      }
      isGray = !isGray;
    }
  }
}
