import JsPDF from 'jspdf';
import React, { Component } from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  position: {
    type: String,
    allowedValues: ['Support', 'Oppose', 'Comments Only'],
  },
  testimony: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

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
    doc.setFontSize(8);
    doc.text('STATE OF HAWAI\'I', 92.5, 30);
    doc.text('DEPARTMENT OF EDUCATION', 84.5, 34);
    doc.text('DEPARTMENT OF EDUCATION', 84.5, 34);
    doc.setFontSize(7);
    doc.text('DAVID Y. IGE', 30, 8, 'right');
    doc.text('xxxxxxxxxxxx', 195, 8, 'right');
    doc.setFont('Times', 'roman');
    doc.text('GOVERNOR', 30, 12, 'right');
    doc.text('xxxxxxxxxxxxxxx', 195, 12, 'right');
    doc.setFont('Times', 'bold');
    doc.addImage(logo, 'png', 95, 4, 21, 21);
    doc.setFontSize(14);
    doc.text('Date: ', 130, 50);
    doc.text('Time: ', 130, 55);
    doc.text('Location: ', 130, 60);
    doc.text('Committee: ', 130, 65);
    doc.text('Department: ', 15, 75);
    doc.text('Testifier ', 15, 85);
    doc.text('Title of Bill ', 15, 95);
    doc.text('Purpose of Bill ', 15, 105);
    doc.text('Department\'s Position: ', 15, 125);
    doc.setFont('Times', 'roman');
    doc.setFontSize(8);
    doc.text('P.O. BOX 2360', 97, 38);
    doc.text('HONOLULU, HAWAI`I 96804', 88, 42);
    doc.setFontSize(14);
    doc.text(date, 145, 50);
    doc.text(time, 145, 55);
    doc.text('xxxxxxxxxxxxx', 153, 60);
    doc.text('xxxxxxxxxxxxx', 157, 65);
    doc.text('xxxxxxxxxxxxx', 65, 75);
    doc.text('xxxxxxxxxxxxx', 65, 85);
    doc.text('xxxxxxxxxxxxx', 65, 95);
    const splitTitle = doc.splitTextToSize(purpose, 120);
    doc.text(splitTitle, 65, 105);
    doc.setFontSize(13);
    const splitTitle1 = doc.splitTextToSize(position, 170);
    doc.text(splitTitle1, 15, 135);
    window.open(doc.output('bloburl'), '_blank');
  };

  render() {
    return (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={12}>
            <Col className="text-center"><h2>Testimony PDF Generator</h2></Col>
            <AutoForm schema={bridge} onSubmit={this.pdfGenerate}>
              <Card>
                <Card.Body>
                  <TextField name="firstName" placeholder="Type first name here" />
                  <TextField name="lastName" placeholder="Type last name here" />
                  <SelectField name="position" multiple checkboxes />
                  <h3>Type out testimony</h3>
                  <LongTextField name="testimony" placeholder="Type testimony here..." />
                  <SubmitField value="Generate PDF" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default Pdf;
