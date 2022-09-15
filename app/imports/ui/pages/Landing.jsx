import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div className="landingContainer">
    <Container id={PAGE_IDS.LANDING} className="py-3">
      <Row className="align-middle text-center">
        <Col>
          <Image src="/images/aDOEbo-logo.png" width="250px" />
          <br />
          <br />
          <p> DOE-Tracker is a student made web-application to assist the DOE in tracking important bills
            through the legistlative process.
          </p>
        </Col>

        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1 className="landingHeader">Stay in the know with</h1>
          <h1 className="landingHeader" style={{ color: '#3866f2' }}>DOE-Tracker!</h1>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <br />
          <br />
          <br />
          <br />
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <a href="http://localhost:3000/signin"><button type="button" className="btn btn-outline-primary" href="http://localhost:3000/signin" role="button">Sign in here</button></a>
          <br />
          <a href="http://localhost:3000/signup">New? Signup Here</a>
        </Col>

      </Row>
    </Container>
  </div>
);

export default Landing;
