/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable new-cap */
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default (doctor, appointmentPrice, appointmentDate, paymentMethod) => {
  const columns = [
    { title: 'Doctor', dataKey: 'DOCTOR' },
    { title: 'Appointment price', dataKey: 'PRICE' },
    { title: 'Appointment date', dataKey: 'DATE' },
    { title: 'Payment method', dataKey: 'METHOD' },
  ];

  const rows = [
    {
      DOCTOR: `${doctor.firstName} ${doctor.lastName}`,
      PRICE: appointmentPrice,
      DATE: appointmentDate,
      METHOD: paymentMethod,
    },
  ];

  const doc = new jsPDF('p', 'pt');
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text('Medial bill', 10, 20);
  doc.setFontSize(12);
  doc.text('DOCWire - 2020', 10, 50);

  doc.autoTable(columns, rows, {
    startY: 70,
    margin: { horizontal: 10 },
    styles: { overflow: 'linebreak' },
    bodyStyles: { valign: 'top' },
    columnStyles: { email: { columnWidth: 'wrap' } },
    theme: 'striped',
  });

  doc.save('medical_bill.pdf');
};
