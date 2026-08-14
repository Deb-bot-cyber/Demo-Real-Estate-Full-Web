// Export utilities for CSV, Excel, and PDF formats

export function exportToCSV(data: Record<string, any>[], filename: string) {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows: string[] = [];

  // Add header row
  csvRows.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));

  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header] === undefined || row[header] === null ? '' : String(row[header]);
      return `"${val.replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToExcel(data: Record<string, any>[], filename: string) {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }

  const headers = Object.keys(data[0]);

  // Excel-compatible HTML Table format
  let excelContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8" />
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>${filename}</x:Name>
              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
        th { bg-color: #EA580C; background: #EA580C; color: white; padding: 10px; border: 1px solid #ddd; text-align: left; }
        td { padding: 8px; border: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f9f9f9; }
      </style>
    </head>
    <body>
      <h2>Shri Laxmi Property - Export Report: ${filename}</h2>
      <table>
        <thead>
          <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>${headers.map(h => `<td>${row[h] !== undefined && row[h] !== null ? String(row[h]) : ''}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(title: string, data: Record<string, any>[]) {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }

  const headers = Object.keys(data[0]);

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export PDF reports.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title} - Report</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; color: #1c1917; }
        .header { display: flex; justify-content: space-between; align-items: center; border-b: 2px solid #ea580c; padding-bottom: 15px; margin-bottom: 25px; }
        .brand { font-size: 24px; font-weight: bold; letter-spacing: 3px; color: #ea580c; }
        .title { font-size: 18px; font-weight: 500; color: #44403c; }
        .timestamp { font-size: 11px; color: #78716c; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
        th { background-color: #f5f5f4; color: #1c1917; font-weight: bold; text-align: left; padding: 10px; border-bottom: 2px solid #d6d3d1; text-transform: uppercase; font-size: 10px; letter-spacing: 1px; }
        td { padding: 10px; border-bottom: 1px solid #e7e5e4; vertical-align: top; }
        tr:nth-child(even) { background-color: #fafaf9; }
        .footer { margin-top: 40px; font-size: 10px; color: #a8a29e; text-align: center; border-t: 1px solid #e7e5e4; padding-top: 15px; }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">SHRI LAXMI PROPERTY</div>
          <div class="title">${title}</div>
        </div>
        <div class="timestamp">Generated: ${new Date().toLocaleString()}</div>
      </div>

      <table>
        <thead>
          <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>${headers.map(h => `<td>${row[h] !== undefined && row[h] !== null ? String(row[h]) : ''}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        © 2026 Shri Laxmi Property. Confidential Client & Asset Report.
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
