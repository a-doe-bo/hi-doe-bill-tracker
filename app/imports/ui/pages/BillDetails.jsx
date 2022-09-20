import React from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { Stuffs } from '../../api/stuff/StuffCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const oldCode = `
THE SENATE
S.B. NO.
2035
THIRTY-FIRST LEGISLATURE, 2022
S.D. 1
STATE OF HAWAII
 
 
 
 
 
 
A BILL FOR AN ACT
 
 
RELATING TO REGENERATIVE TOURISM.
 
 
BE IT ENACTED BY THE LEGISLATURE OF THE STATE OF HAWAII:
`;

const newCode = `
THE SENATE
S.B. NO.
2035
THIRTY-FIRST LEGISLATURE, 2022
S.D. 2
STATE OF HAWAII
 
 
 
 
 
 
A BILL FOR AN ACT
 
 
RELATING TO REGENERATIVE TOURISM.
 
 
BE IT ENACTED BY THE LEGISLATURE OF THE STATE OF HAWAII:
`;

/* Renders the EditStuff page for editing a single document. */
const BillDetails = () => {

  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Stuffs.subscribeStuff();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Stuffs.findDoc(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  return ready ? (
    <Container id={PAGE_IDS.BILL_DETAILS} className="py-3">
      <Alert key="warning" variant="warning">
        A hearing has been schedueled for 01/01/2022 00:00:00 HST
      </Alert>
      <Alert key="danger" variant="danger">
        This bill is now dead as it has not passed its hearing.
      </Alert>
      <h2 style={{ paddingTop: '10px', paddingBottom: '15px' }}>
        SB2035 SD2
        <span style={{ backgroundColor: 'red', borderRadius: '50%', padding: '15px', marginLeft: '20px' }}>Died</span>
      </h2>
      <div style={{ backgroundColor: '#F5F5F5', borderRadius: '30px', padding: '20px' }}>
        <Row className="justify-content-center">
          <a style={{ marginBottom: '20px' }} href="https://www.google.com">Latest version of bill</a>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Measure Title:
          </Col>
          <Col>
            RELATING TO REGENERATIVE TOURISM
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Report Title:
          </Col>
          <Col>
            Objectives and Policies; Visitor Industry; State Tourism Functional Plan; Hawaii Tourism Authority; Office of Planning and Sustainability
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Description:
          </Col>
          <Col>
            Incorporates a regenerative framework into the State Planning Act by expanding objectives and policies for the visitor industry.
            Requires an update to the State Tourism Functional Plan to be submitted to the Legislature no later than 20 days prior to the convening
            of the Regular Session of 2023. Effective 7/1/2050. (SD2)
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Companion:
          </Col>
          <Col xs={2}>
            HB1767
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Package:
          </Col>
          <Col>
            None
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Current Referral:
          </Col>
          <Col>
            LAT, CPC, FIN
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Introducer(s):
          </Col>
          <Col>
            KEOHOKALOLE, ACASIO, BAKER, FEVELLA, GABBARD, KEITH-AGARAN, MISALUCHA, SAN BUENAVENTURA, Dela Cruz, Ihara, Inouye, Kidani, Nishihara, Riviere, Wakai
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button style={{ marginTop: '10px' }}>Advanced Options</Button>
          <Button variant="danger">Bill History</Button>{' '}
          <Button variant="success">Comments</Button>{' '}
          <Button variant="warning">Testimony</Button>{' '}
        </div>
      </div>

      <h4 style={{ marginTop: '30px' }}>
        Differences between current and previous revision of bill:
      </h4>
      <ReactDiffViewer oldValue={oldCode} newValue={newCode} extraLinesSurroundingDiff={99999} compareMethod={DiffMethod.WORDS_WITH_SPACE} />
    </Container>
  ) : <LoadingSpinner />;
};

export default BillDetails;
