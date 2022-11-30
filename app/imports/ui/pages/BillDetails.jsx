import React from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import BillItem from '../components/BillItem';
import { Measures } from '../../api/measure/MeasureCollection';

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
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { _id } = useParams();
  const { ready, measure } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Measures.subscribeMeasures();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const measureItem = Measures.find({ _id }, {}).fetch();
    return {
      measure: measureItem[0],
      ready: rdy,
    };
  });

  return ready ? (
    <Container id={PAGE_IDS.BILL_DETAILS} className="py-3">
      <h2 style={{ paddingTop: '10px', paddingBottom: '15px' }}>
        SB2035 SD2
      </h2>
      <div style={{ backgroundColor: '#F5F5F5', borderRadius: '30px', padding: '20px' }}>
        <Row className="justify-content-center">
          <a style={{ marginBottom: '20px' }} href={measure.measurePdfUrl}>Latest version of bill</a>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Measure Title:
          </Col>
          <Col>
            {measure.measureTitle}
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Report Title:
          </Col>
          <Col>
            {measure.reportTitle}
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Description:
          </Col>
          <Col>
            {measure.description}
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Companion:
          </Col>
          <Col xs={2}>
            {measure.companion ? measure.companion : 'none'}
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Current Referral:
          </Col>
          <Col>
            {measure.currentReferral}
          </Col>
        </Row>
        <Row className="pt-lg-0">
          <Col xs={2}>
            Introducer(s):
          </Col>
          <Col>
            {measure.introducer}
          </Col>
        </Row>
      </div>

      <h4 style={{ marginTop: '30px' }}>
        Differences between current and previous revision of bill:
      </h4>
      <ReactDiffViewer oldValue={oldCode} newValue={newCode} extraLinesSurroundingDiff={99999} compareMethod={DiffMethod.WORDS_WITH_SPACE} />
    </Container>
  ) : <LoadingSpinner />;
};

BillItem.propTypes = {
  billData: PropTypes.shape({
    _id: PropTypes.string,
    bill_name: PropTypes.string,
    bill_status: PropTypes.string,
    bill_hearing: PropTypes.string,
    bill_code: PropTypes.string,
    bill_number: PropTypes.number,
    report_title: PropTypes.string,
    bill_description: PropTypes.string,
  }).isRequired,
};

export default BillDetails;
