import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Bell, CheckAll, EnvelopeOpen, House } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div className="landingContainer">
    <div style={{ backgroundImage: 'url("https://www.tripsavvy.com/thmb/QhnBGPOxnY9LcfLQelBdPVUfwq4=/1440x1080/smart/filters:no_upscale()/hawaii-state-capitol-exterior-56a3b8113df78cf7727edd91.jpg")' }}>
      <Container id={PAGE_IDS.LANDING} className="py-3">
        <Row className="align-middle text-center">
          <Col>
            <Image src="/images/logo-720x720.png" style={{ width: '350px', marginBottom: '50px' }} />
            <br />
            <br />
            <h5 style={{ color: '#140E03' }}> DOE-Tracker is a student made web-application to assist the DOE in tracking important bills
              through the legislative process.
            </h5>
          </Col>

          <Col className="d-flex flex-column justify-content-center">
            <h1 className="landingHeader" style={{ color: '#140E03' }}>Stay in the know with</h1>
            <h1 className="landingHeader" style={{ color: '#ef2c2c', marginBottom: '50px' }}>DOE-Tracker!</h1>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <h4 style={{ color: '#fab538' }}>Organize <House /> -
              Notify <Bell /> -
              Testify <EnvelopeOpen /> -
              Approve <CheckAll />
            </h4>
          </Col>

        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
