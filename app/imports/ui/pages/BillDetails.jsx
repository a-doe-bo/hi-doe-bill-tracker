import React from 'react';
import swal from 'sweetalert';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(Stuffs._schema);

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
 

     SECTION 1.  Section 226-8, Hawaii Revised Statutes, is amended by amending subsection (b) to read as follows:
     "(b)  To achieve the visitor industry objective, it shall be the policy of this State to:
     (1)  Support and assist in the promotion of Hawaii's visitor attractions and facilities[.];
     (2)  Ensure that visitor industry activities are in keeping with the social, economic, and physical needs and aspirations of Hawaii's people[.];
     (3)  Improve the quality of existing visitor destination areas by utilizing Hawaii's strengths in science and technology[.];
     (4)  Encourage cooperation and coordination between the government and private sectors in developing and maintaining well-designed, adequately serviced visitor industry and related developments [which] that are sensitive to neighboring communities and activities[.];
     (5)  Develop the industry in a manner that will continue to provide new job opportunities and steady employment for Hawaii's people[.], commit to building their capacity, and offer career opportunities to ultimately increase the percentage of Hawaii residents in management and leadership positions in the visitor industry;
     (6)  Provide opportunities for Hawaii's people to obtain job training and education that will allow for upward mobility within the visitor industry[.];
     (7)  Foster a recognition of the contribution of the visitor industry to Hawaii's economy and the need to perpetuate the aloha spirit[.];
     (8)  Foster an understanding by visitors of the aloha spirit and of the unique and sensitive character of Hawaii's cultures and values[.];
     (9)  Form community partnerships to ensure native Hawaiian cultural integrity by:
          (A)  Supporting Hawaii's people and communities and their efforts to malama aina (care for the land) and the cultural and natural resources of the aina (land), oceans, streams, and skies;
          (B)  Strengthening the relationships between the place and people for kamaaina (Hawaii residents) and malihini (visitors) alike;
          (C)  Engaging in collaborative efforts that provide visitors with genuine and meaningful experiences in Hawaii;
          (D)  Ensuring that kapu (prohibited) and environmentally sensitive contexts are protected from visitor traffic;
          (E)  Positioning local business owners and entrepreneurs in the economic value chain to ensure more meaningful visitor and resident engagement as well as economic benefit to local communities; and
          (F)  Acknowledging and, where appropriate, protecting native Hawaiian cultural intellectual property, traditional knowledge, and traditional cultural expressions that contribute to Hawaii's economy;
    (10)  Apply innovative financial policies as well as data collection and analysis mechanisms to incentivize and facilitate a shift to a regenerative visitor industry that has a smaller ecological footprint by implementing policies such as decreasing the impacts on beaches, reefs, and ocean life; and that aims to sustain and improve the quality of life for Hawaii residents by implementing policies such as decreasing the impacts of vacation rentals, bed and breakfast operations, and rental cars;
    (11)  Target markets that have a high probability of alignment with the goal of cultivating a regenerative visitor industry;
    (12)  Actively support and encourage other economic sectors and clusters to reduce the State's dependence on tourism to support Hawaii's overall economic prosperity;
    (13)  Minimize negative economic, environmental, and social impacts to the State;
    (14)  Generate greater economic benefits for Hawaii residents, enhance the well-being of Hawaii's indigenous communities, and improve the working conditions and access to the visitor industry;
    (15)  Involve Hawaii residents in decisions that affect their lives and life changes;
    (16)  Make positive contributions to the conservation of natural and cultural heritage for the maintenance of Hawaii's diversity;
    (17)  Provide more enjoyable experiences and a greater understanding of local cultural, social, and environmental issues for tourists through more meaningful connections with Hawaii residents; and
    (18)  Provide equitable access for individuals with disabilities and sociologically disadvantaged people that is culturally sensitive, engenders respect between tourists and residents, and builds pride and confidence in Hawaii."
     SECTION 2.  (a)  Pursuant to section 226-55, Hawaii Revised Statutes, the Hawaii tourism authority, in coordination with the office of planning and sustainable development, shall prepare and periodically update the tourism functional plan to include updated tourism economic goals, the Hawaii tourism authority's strategic plan, and the Hawaii 2050 sustainability plan. 
     (b)  The governor to submit the state tourism functional plan pursuant to section 226-56, Hawaii Revised Statutes, including any proposed legislation, to the legislature no later than twenty days prior to the convening of the regular session of 2023.  
     SECTION 3.  Statutory material to be repealed is bracketed and stricken.  New statutory material is underscored.
     SECTION 4.  This Act shall take effect upon its approval.
 

 
Report Title:
Objectives and Policies; Visitor Industry; State Tourism Functional Plan; Hawaii Tourism Authority; Office of Planning and Sustainability
 
Description:
Incorporates a regenerative framework into the State Planning Act by expanding objectives and policies for the visitor industry.  Requires an update to the State Tourism Functional Plan to be submitted to the Legislature no later than twenty days prior to the convening of the regular session of 2023.  (SD1)
 
 
 
The summary description of legislation appearing on this page is for informational purposes only and is not legislation or evidence of legislative intent.
 
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
 

     SECTION 1.  Section 226-8, Hawaii Revised Statutes, is amended by amending subsection (b) to read as follows:
     "(b)  To achieve the visitor industry objective, it shall be the policy of this State to:
     (1)  Support and assist in the promotion of Hawaii's visitor attractions and facilities[.];
     (2)  Ensure that visitor industry activities are in keeping with the social, economic, and physical needs and aspirations of Hawaii's people[.];
     (3)  Improve the quality of existing visitor destination areas by utilizing Hawaii's strengths in science and technology[.];
     (4)  Encourage cooperation and coordination between the government and private sectors in developing and maintaining well-designed, adequately serviced visitor industry and related developments [which] that are sensitive to neighboring communities and activities[.];
     (5)  Develop the industry in a manner that will continue to provide new job opportunities and steady employment for Hawaii's people[.], commit to building their capacity, and offer career opportunities to ultimately increase the percentage of Hawaii's people who hold management and leadership positions in the visitor industry;
     (6)  Provide opportunities for Hawaii's people to obtain job training and education that will allow for upward mobility within the visitor industry[.];
     (7)  Foster a recognition of the contribution of the visitor industry to Hawaii's economy and the need to perpetuate the aloha spirit[.];
     (8)  Foster an understanding by visitors of the aloha spirit and of the unique and sensitive character of Hawaii's cultures and values[.];
     (9)  Form community partnerships to ensure native Hawaiian cultural integrity by:
          (A)  Supporting Hawaii's people and communities and their efforts to care for the land and protect the cultural and natural resources of the land, oceans, streams, and skies;
          (B)  Strengthening the relationships between the place and people for Hawaii's people and visitors alike;
          (C)  Engaging in collaborative efforts that provide visitors with genuine and meaningful experiences in Hawaii;
          (D)  Ensuring that kapu (prohibited) and environmentally sensitive contexts are protected from visitor traffic;
          (E)  Positioning local business owners and entrepreneurs in the economic value chain to ensure more meaningful visitor and resident engagement as well as economic benefit to local communities; and
          (F)  Acknowledging and, where appropriate, protecting native Hawaiian cultural intellectual property, traditional knowledge, and traditional cultural expressions that contribute to Hawaii's economy;
    (10)  Apply innovative financial policies as well as data collection and analysis to incentivize and facilitate a shift to a regenerative visitor industry that has a smaller ecological footprint by implementing policies such as decreasing the impacts on beaches, reefs, and ocean life, and that aims to sustain and improve the quality of life for Hawaii's people by implementing policies such as decreasing the impacts of vacation accommodation rentals, bed and breakfast operations, and rental cars;
    (11)  Target markets that have a high probability of alignment with the goal of cultivating a regenerative visitor industry;
    (12)  Actively support and encourage other economic sectors and clusters to reduce the State's dependence on tourism to support Hawaii's overall economic prosperity;
    (13)  Minimize negative economic, environmental, and social impacts to the State;
    (14)  Generate greater economic benefits for Hawaii's people, enhance the well-being of Hawaii's indigenous communities, and improve the working conditions and access to the visitor industry;
    (15)  Involve Hawaii's people in decisions that affect their lives and life changes;
    (16)  Make positive contributions to the conservation of natural and cultural heritage for the maintenance of Hawaii's diversity;
    (17)  Provide more enjoyable experiences and a greater understanding of local cultural, social, and environmental issues for visitors through more meaningful connections with Hawaii's people; and
    (18)  Provide equitable access for individuals with disabilities and sociologically disadvantaged people that is culturally sensitive, engenders respect between visitors and Hawaii's people, and builds pride and confidence in Hawaii."
     SECTION 2.  (a)  Pursuant to section 226-55, Hawaii Revised Statutes, the Hawaii tourism authority, in coordination with the office of planning and sustainable development, shall prepare and periodically update the tourism functional plan to include updated tourism economic goals, the Hawaii tourism authority's strategic plan, and the Hawaii 2050 sustainability plan.
     (b)  The governor shall submit an update to the state tourism functional plan pursuant to section 226-56, Hawaii Revised Statutes, including any proposed legislation, to the legislature no later than twenty days prior to the convening of the regular session of 2023.
     SECTION 3.  Statutory material to be repealed is bracketed and stricken.  New statutory material is underscored.
     SECTION 4.  This Act shall take effect on July 1, 2050.
 

 
Report Title:
Objectives and Policies; Visitor Industry; State Tourism Functional Plan; Hawaii Tourism Authority; Office of Planning and Sustainability
 
Description:
Incorporates a regenerative framework into the State Planning Act by expanding objectives and policies for the visitor industry.  Requires an update to the State Tourism Functional Plan to be submitted to the Legislature no later than 20 days prior to the convening of the Regular Session of 2023.  Effective 7/1/2050.  (SD2)
 
 
 
The summary description of legislation appearing on this page is for informational purposes only and is not legislation or evidence of legislative intent.
 
 
`;

/* Renders the EditStuff page for editing a single document. */
const EditStuff = () => {

  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
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

  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, quantity, condition } = data;
    const collectionName = Stuffs.getCollectionName();
    const updateData = { id: _id, name, quantity, condition };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_STUFF} className="py-3">
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
            Incorporates a regenerative framework into the State Planning Act by expanding objectives and policies for the visitor industry. Requires an update to the State Tourism Functional Plan to be submitted to the Legislature no later than 20 days prior to the convening of the Regular Session of 2023. Effective 7/1/2050. (SD2)
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
      <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={false} hideLineNumbers extraLinesSurroundingDiff={9999} compareMethod={DiffMethod.WORDS_WITH_SPACE} />
    </Container>
  ) : <LoadingSpinner />;
};

export default EditStuff;
