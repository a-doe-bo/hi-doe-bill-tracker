import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import GeneratePDF from '../components/GeneratePDF';

class Pdf extends Component {

  render() {
    return (
      <div style={{ textAlign: 'center' }}><br />
        <Button onClick={GeneratePDF}>Generate PDF</Button>
      </div>
    );
  }
}
export default Pdf;
