import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export function exportToExcel(data: any, header: string[]) {
  const ws = XLSX.utils.json_to_sheet(data, { header });
  //Create a workbook
  const wb = XLSX.utils.book_new();
  //Add our worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "sheet1");
  //Convert to binary data
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
  //Save and download
  saveAs(new Blob([buf], { type: "application/octet-stream" }), "selected-data.xlsx");
}

