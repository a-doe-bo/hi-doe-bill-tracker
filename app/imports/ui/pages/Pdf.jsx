import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import JsPDF from 'jspdf';

class Pdf extends Component {
  pdfGenerate = () => {
    const doc = new JsPDF();
    const logo = new Image();
    logo.src = '/images/DOElogo.png';
    const today = new Date();
    const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    let time;
    let minute;
    if (today.getMinutes() < 10) {
      minute = `0${today.getMinutes()}`;
    } else {
      minute = today.getMinutes();
    }
    if ((today.getHours() - 12) < 0) {
      time = `${today.getHours()}:${minute} AM`;
    } else if ((today.getHours() - 12) === 0) {
      time = `${today.getHours()}:${minute} PM`;
    } else {
      time = `${today.getHours() - 12}:${minute} PM`;
    }
    const purpose = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    // eslint-disable-next-line max-len
    const position = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    doc.setFont('Times', 'bold');
    doc.setFontSize(14);
    doc.addImage(logo, 'png', 15, 10, 25, 25);
    doc.text(130, 20, 'Date: ');
    doc.text(130, 25, 'Time: ');
    doc.text(130, 30, 'Location: ');
    doc.text(130, 35, 'Committee: ');
    doc.text(15, 50, 'Department: ');
    doc.text(15, 60, 'Testifier ');
    doc.text(15, 70, 'Title of Bill ');
    doc.text(15, 80, 'Purpose of Bill ');
    doc.text(15, 100, 'Department\'s Position: ');
    doc.setFont('Times', 'roman');
    doc.text(145, 20, date);
    doc.text(145, 25, time);
    doc.text(153, 30, 'xxxxxxxxxxxxx');
    doc.text(157, 35, 'xxxxxxxxxxxxx');
    doc.text(65, 50, 'xxxxxxxxxxxxx');
    doc.text(65, 60, 'xxxxxxxxxxxxx');
    doc.text(65, 70, 'xxxxxxxxxxxxx');
    const splitTitle = doc.splitTextToSize(purpose, 120);
    doc.text(65, 80, splitTitle);
    const splitTitle1 = doc.splitTextToSize(position, 170);
    doc.text(15, 110, splitTitle1);
    window.open(doc.output('bloburl'), '_blank');
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
