import React from 'react';
import { Button } from 'react-bootstrap';
import GeneratePDF from '../components/GeneratePDF';

const Pdf = () => (
  <div style={{ textAlign: 'center' }}><br />
    <Button onClick={GeneratePDF}>Generate PDF</Button>
  </div>
);
export default Pdf;
