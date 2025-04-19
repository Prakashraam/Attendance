const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Example: /report/excel?employeeId=EMP123&fromDate=2025-03-01&toDate=2025-03-31
router.get('/excel', reportController.generateExcelReport);

module.exports = router;
const PDFDocument = require('pdfkit');

exports.generatePDFReport = async (req, res) => {
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

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=attendance_report_${employeeId}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text('Attendance Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Employee ID: ${employeeId}`);
    doc.text(`From: ${fromDate} To: ${toDate}`);
    doc.moveDown();

    // Table Headers
    doc.font('Helvetica-Bold');
    doc.text('Date', 30, doc.y, { continued: true });
    doc.text('In Time', 100, doc.y, { continued: true });
    doc.text('Out Time', 180, doc.y, { continued: true });
    doc.text('Shift', 270, doc.y, { continued: true });
    doc.text('Status', 370, doc.y);
    doc.font('Helvetica');

    doc.moveDown(0.5);

    // Table Data
    rows.forEach(row => {
      doc.text(row.Date, 30, doc.y, { continued: true });
      doc.text(row.InTime || '-', 100, doc.y, { continued: true });
      doc.text(row.OutTime || '-', 180, doc.y, { continued: true });
      doc.text(row.Shift, 270, doc.y, { continued: true });
      doc.text(row.Status, 370, doc.y);
    });

    doc.end();
  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).json({ message: 'Failed to generate PDF report' });
  }
};

