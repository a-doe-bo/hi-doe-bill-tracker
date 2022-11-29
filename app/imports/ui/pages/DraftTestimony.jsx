import React, { useEffect, useState } from 'react';
import { Container, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Experts } from '../../api/expert/ExpertCollection';
import SingleFileUpload from '../components/SingleFileUpload';

const DraftTestimony = () => {
  const { ready, assignedBills } = useTracker(() => {
    const assignedSubscription = Experts.subscribeToExpert();
    const rdy = assignedSubscription.ready();
    const assignedItem = Experts.find({ }, {}).fetch();
    return {
      assignedBills: assignedItem,
      ready: rdy,
    };
  }, []);
  const assignedBillData = assignedBills.map((bill) => ({
    _id: bill._id,
    bill_number: bill.bill_number,
    bill_hearing: bill.bill_hearing,
    bill_status: bill.bill_status,
  }));
  const arr = [];
  // eslint-disable-next-line array-callback-return
  assignedBills.map((bill) => {
    arr.push(bill.bill_number);
  });
  const [billData, setData] = useState([]);
  useEffect(() => {
    setData(assignedBillData);
  }, [ready]);

  return (
    <Container id={PAGE_IDS.DRAFT_TESTIMONY} className="py-3">
      <Col xs={12}>
        <Col className="text-center mb-4"><h2>Draft Testimony</h2></Col>
      </Col>
      <SingleFileUpload id={COMPONENT_IDS.DRAFT_TESTIMONY_FILE_UPLOAD} currBills={arr} billData={billData} />
    </Container>
  );
};

export default DraftTestimony;
