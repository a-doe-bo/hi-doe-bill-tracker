import React, { useState } from 'react';
import SimpleSchema from 'simpl-schema';
import { Alert, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const CreateComment = () => {
  // TODO: Implement a userTracker for the bills component it should retrieve the bill info based on the _id

  const [error, setError] = useState('');
  const [lineNumber, setLineNumber] = useState([]);
  const schema = new SimpleSchema({
    reviewer_email: String,
    reviewer_name: String,
    date_comment_created: Date,
    draft_id: String,
    comment: String,
    line_number: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);


  // eslint-disable-next-line
  const submit = (doc, formRef) => {
    // TODO: submit should submit to collection with draft id information.
    console.log('submit');
  };
  const fileContent = [];
  for (let i = 0; i < 100; i++) {
    fileContent.push(`File Content ${i}`);
  }
  const handleLineChange = (event, index) => {
    const { checked } = event.target;
    return checked ? setLineNumber((prevState) => ([...prevState, index + 1])) :
      setLineNumber((prevState) => (prevState.filter((lineValue) => (lineValue !== index + 1))));
  };
  let fRef = null;
  return (
    <Container id={PAGE_IDS.CREATE_COMMENTS}>
      <Row className="justify-content-center d-flex align-content-center">
        <Col>
          <Form>
            <Card style={{ maxHeight: '90vh' }}>
              <Card.Header className="text-center">Title of Bill #1</Card.Header>
              <Card.Body className="overflow-auto">
                {fileContent.map((line, index) => (
                  <Form.Check
                    label={`${index + 1}. ${line}`}
                    name={`line-${index}`}
                    type="checkbox"
                    key={index}
                    onClick={(event) => { handleLineChange(event, index); }}
                  />
                ))}
              </Card.Body>
            </Card>
          </Form>
        </Col>
        <Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <LongTextField id={COMPONENT_IDS.CREATE_COMMENTS_FORM_COMMENT} name="comment" placeholder="Comment" />
                <TextField disabled id={COMPONENT_IDS.CREATE_COMMENTS_LINE} name="line_number" placeholder="Line Number" value={lineNumber.join(', ')} />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.CREATE_COMMENTS_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
        {error === '' ? (
          ''
        ) : (
          <Alert variant="danger">
            <Alert.Heading>Error Creating Comment</Alert.Heading>
            {error}
          </Alert>
        )}
      </Row>
    </Container>
  );
};

export default CreateComment;
