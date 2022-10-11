import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import JsPDF from 'jspdf';

class Pdf extends Component {
  pdfGenerate = () => {
    const doc = new JsPDF();
    const today = new Date();
    const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();
    const purpose = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const position = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    doc.setFont('Times', 'bold');
    doc.setFontSize(14);
    doc.text(130, 20, 'Date: ');
    doc.text(130, 25, 'Time: ');
    doc.text(130, 30, 'Location: ');
    doc.text(130, 35, 'Committee: ');
    doc.text(15, 50, 'Department: ');
    doc.text(15, 65, 'Testifier ');
    doc.text(15, 80, 'Title of Bill ');
    doc.text(15, 95, 'Purpose of Bill ');
    doc.text(15, 130, 'Department\'s Position: ');
    doc.setFont('Times', 'roman');
    doc.text(145, 20, date);
    doc.text(145, 25, time);
    doc.text(153, 30, 'xxxxxxxxxxxxx');
    doc.text(157, 35, 'xxxxxxxxxxxxx');
    doc.text(65, 50, 'xxxxxxxxxxxxx');
    doc.text(65, 65, 'xxxxxxxxxxxxx');
    doc.text(65, 80, 'xxxxxxxxxxxxx');
    const splitTitle = doc.splitTextToSize(purpose, 120);
    doc.text(65, 95, splitTitle);
    const splitTitle1 = doc.splitTextToSize(position, 170);
    doc.text(15, 140, splitTitle1);
    doc.save('a.pdf');
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}><br />
        <Button onClick={this.pdfGenerate}>Generate PDF</Button>
      </div>
    );
  }
}
export default Pdf;
