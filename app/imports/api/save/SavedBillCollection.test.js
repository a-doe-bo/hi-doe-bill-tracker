import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import fc from 'fast-check';
import { Saved } from './SavedBillCollection';
import { removeAllEntities } from '../base/BaseUtilities';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('SavedBillsCollection', function testSuite() {
    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(
          fc.integer(1, 1000),
          fc.lorem(1),
          fc.lorem(1),
          fc.lorem(1),
          fc.lorem(1),
          fc.lorem(1),
          (bill_number, bill_code, bill_name, bill_status, bill_hearing, owner) => {
            const docID = Saved.define({
              bill_number, bill_code, bill_name, bill_status, bill_hearing, owner,
            });
            expect(Saved.isDefined(docID)).to.be.true;
            Saved.removeIt(docID);
            expect(Saved.isDefined(docID)).to.be.false;
          },
        ),
      );
      done();
    });

    it('Can dumpOne, removeIt, and restoreOne', function test4() {
      const origDoc = Saved.findOne({});
      let docID = origDoc._id;
      const dumpObject = Saved.dumpOne(docID);
      Saved.removeIt(docID);
      expect(Saved.isDefined(docID)).to.be.false;
      docID = Saved.restoreOne(dumpObject);
      expect(Saved.isDefined(docID)).to.be.true;
      const doc = Saved.findDoc(docID);
      expect(doc.bill_number).to.equal(origDoc.bill_number);
      expect(doc.bill_code).to.equal(origDoc.bill_code);
      expect(doc.bill_name).to.equal(origDoc.bill_name);
      expect(doc.bill_status).to.equal(origDoc.bill_status);
      expect(doc.bill_hearing).to.equal(origDoc.bill_hearing);
      expect(doc.owner).to.equal(origDoc.owner);
    });
  });
}
