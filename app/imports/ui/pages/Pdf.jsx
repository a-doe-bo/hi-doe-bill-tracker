import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import jsPDF from 'jspdf';

class Pdf extends Component {
  pdfGenerate = () => {
    const doc = new jsPDF('landscape', 'px', 'a4', 'false');

    doc.setFont('Helvertica', 'bold');
    doc.text(60, 60, 'name');
    doc.save('a.pdf');
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}><br/>
        <Button onClick={this.pdfGenerate}>Generate PDF</Button>
      </div>
    );
  }
}
export default Pdf;
