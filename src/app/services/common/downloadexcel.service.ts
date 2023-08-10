import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadexcelService {

  constructor() { }

  downloadExcel(tableRef: ElementRef): void {
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>`;
    const base64 = function(s: any) { return window.btoa(unescape(encodeURIComponent(s))) };
    const format = function(s: any, c: any) { return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) };
  
    const table = tableRef.nativeElement
  
    const thElements = table.querySelectorAll('thead th');
    const tdElements = Array.from(table.querySelectorAll('tbody tr td'));

    for (let i = 0; i < thElements.length; i++) {
    const style = 'font-weight: bold;';
    (thElements[i] as HTMLElement).style.cssText = style;
    }

    for (let i = 0; i < tdElements.length; i++) {
    const rowIndex = Math.floor(i / thElements.length); // Calculate row index
    const isAlternateRow = rowIndex % 2 === 1; // Check if row index is odd
    const style = isAlternateRow ? 'background-color: lightgrey;' : '';
    (tdElements[i] as HTMLElement).style.cssText = style;
    }

    
    const ctx = { worksheet: 'Worksheet', table: table.innerHTML };
  
    const link = document.createElement('a');
    link.download = 'data.xls'; // Generic file name
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
}
