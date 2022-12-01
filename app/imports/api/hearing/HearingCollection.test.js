import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { Hearings } from './HearingCollection';
import { removeAllEntities } from '../base/BaseUtilities';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('HearingCollection', function testSuite() {
    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(
          fc.integer(2021, 2023),
          fc.lorem(1),
          fc.integer(1, 200),
          fc.lorem(10),
          fc.lorem(10),
          fc.lorem(10),
          fc.lorem(10),
          (year, measureType, measureNumber, datetime, description, room, notice) => {
            const docID = Hearings.define({
              year, measureType, measureNumber, datetime, description, room, notice,
            });
            expect(Hearings.isDefined(docID)).to.be.true;
            Hearings.removeIt(docID);
            expect(Hearings.isDefined(docID)).to.be.false;
          },
        ),
      );
      done();
    });
  });
}
