const ExcelJS = require('exceljs');
const db = require('../config/db');

exports.generateExcelReport = async (req, res) => {
  const { employeeId, fromDate, toDate } = req.query;

  try {
    const query = `
      SELECT A.Date, A.InTime, A.OutTime, S.Name AS Shift, A.Status
      FROM Attendance A
      JOIN Shifts S ON A.ShiftID = S.ShiftID
      WHERE A.EmployeeID = ? AND A.Date BETWEEN ? AND ?
      ORDER BY A.Date ASC
    `;
    const [rows] = await db.query(query, [employeeId, fromDate, toDate]);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance Report');

    worksheet.columns = [
      { header: 'Date', key: 'Date', width: 15 },
      { header: 'In Time', key: 'InTime', width: 15 },
      { header: 'Out Time', key: 'OutTime', width: 15 },
      { header: 'Shift', key: 'Shift', width: 20 },
      { header: 'Status', key: 'Status', width: 20 },
    ];

    rows.forEach(row => {
      worksheet.addRow(row);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=attendance_report_${employeeId}.xlsx`);

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    console.error('Error generating Excel report:', error);
    res.status(500).json({ message: 'Failed to generate Excel report' });
  }
};
