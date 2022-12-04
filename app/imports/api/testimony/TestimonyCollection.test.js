import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { Testimonies } from './TestimonyCollection.js';
import { removeAllEntities } from '../base/BaseUtilities';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('TestimonyCollection', function testSuite() {
    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(
          fc.lorem(1),
          fc.lorem(1),
          fc.lorem(1),
          fc.lorem(30),
          (firstName, lastName, position, testimony) => {
            const docID = Testimonies.define({
              firstName,
              lastName, position, testimony,
            });
            expect(Testimonies.isDefined(docID)).to.be.true;
            Testimonies.removeIt(docID);
            expect(Testimonies.isDefined(docID)).to.be.false;
          },
        ),
      );
      done();
    });

    it('Can update', function test3(done) {
      const firstName = faker.lorem.word();
      const lastName = faker.lorem.word();
      const position = faker.lorem.word();
      const testimony = faker.lorem.words();
      const docID = Testimonies.define({
        firstName,
        lastName, position, testimony,
      });
      // console.log(Stuffs.findDoc(docID));
      fc.assert(
        fc.property(
          fc.lorem(30),
          (newtestimony) => {
            Testimonies.update(docID, {
              testimony: newtestimony,
            });
            const testimonial = Testimonies.findDoc(docID);
            expect(testimonial.testimony).to.equal(newtestimony);
          },
        ),
      );
      done();
    });
  });
}
