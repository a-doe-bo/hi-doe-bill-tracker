import React from 'react';
import { Container, Card, Button, Col, Row, CardGroup, ListGroup, Tab, Tabs, ButtonGroup } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const DraftTestimony = () => (
  <Container id={PAGE_IDS.DRAFT_TESTIMONY} className="py-3">
    <Row>
      <CardGroup>
        <Card className="border-white">
          <h1>Draft Testimony</h1>
        </Card>
      </CardGroup>
    </Row>

    <Card className="mt-3 border-0 bg-transparent shadow-none">
      <Row className="mb-3 col-sm-2 col-form-label bold-text">Testifier: </Row>
      <Row className="mb-3">
        <Col className="col-sm-3">
          <input className="form-control" placeholder="First name" />
        </Col>
        <Col className="col-sm-3">
          <input className="form-control" placeholder="Last name" />
        </Col>
        <Col className="col-sm-3">
          <input className="form-control" placeholder="Position" />
        </Col>
      </Row>

      <Card className="col-sm-3 col-form-label bold-text border-0 bg-transparent shadow-none"> Testifying to Bill: </Card>
      <CardGroup className="mb-3 ms-4">
        <Card className="mb-3 border-0 bg-transparent shadow-none">
          <Col>
            <Row className="row-form-label bold-text">Bill Description:</Row>
            <Row className="col-form-label"> EXAMPLE BILL</Row>
          </Col>
          <Col>
            <Row className="row-form-label bold-text">Committee: </Row>
          </Col>
        </Card>
      </CardGroup>

      <Row className="mb-3">
        <Col className="col-sm-2 col-form-label bold-text">Testifying as: </Col>
        <Col className="col-sm-5 mt-2">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="testify" />
            <div className="form-check-label"> Individual </div>
            <input className="form-check-input" type="radio" name="testify" />
            <div className="form-check-label"> Organization </div>
          </div>
          <input className="form-control" placeholder=" Name of organization" />
        </Col>
      </Row>
    </Card>

    <p className="my-3"> Upload or write a testimony below</p>

    <ListGroup className="tabs">
      <ListGroup.Item>
        <Row className="tabs">
          <Col md>
            <Tabs defaultActiveKey="upload" className="mb-3">
              <Tab eventKey="upload" title="Upload testimony">
                <Row className="mb-3">
                  <Col className="col-sm-2 col-form-label bold-text">Upload file: </Col>
                  <Col className="col-sm-9">
                    <input className="form-control" type="file" id="formFile" />
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="write" title="Write testimony">
                <Row className="mb-3">
                  <Col className="col-sm-3 col-form-label bold-text"> Testimony: </Col>
                  <div className="center-block mx-2">
                    <textarea className="form-control" style={{ width: '1250px', height: '100px' }} />
                  </div>
                </Row>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>

    <div className="justify-content-md-end mt-2">
      <ButtonGroup>
        <Button className="btn-success btn-lg" type="submit" id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_SUBMIT}> Submit </Button>
        <Button className="btn-success btn-lg" type="save" id={COMPONENT_IDS.DRAFT_TESTIMONY_FORM_SAVE}> Save </Button>
      </ButtonGroup>
    </div>
  </Container>
);

export default DraftTestimony;
