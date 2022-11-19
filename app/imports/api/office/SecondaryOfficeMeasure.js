import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { isValidOfficeType } from '../legislature/officeTypes';
import { ROLE } from '../role/Role';

export const SecondaryOfficePublications = {
  SecondaryOffice: 'SecondaryOffice',
};

class SecondaryOfficeCollection extends BaseCollection {
  constructor() {
    super('SecondaryOffice', new SimpleSchema({
      measureNumber: Number,
      code: { type: String },
      office: { type: String },
    }));
  }

  define({ measureNumber, code, office }) {
    // PRIMARY KEY (year, SecondaryOfficeType, SecondaryOfficeNumber) so they are unique
    if (this.isDefined({ code, measureNumber, office })) {
      return this.findDoc({ code, measureNumber, office })._id;
    }
    if (!isValidOfficeType(office)) {
      throw new Meteor.Error(`${office} is an invalid SecondaryOffice Type.`);
    }
    const docID = this._collection.insert({ code, measureNumber, office });
    return docID;
  }

  update(docID, { code, measureNumber, office }) {
    const updateData = {};
    if (measureNumber) {
      updateData.measureNumber = measureNumber;
    }
    if (code) {
      updateData.code = code;
    }
    if (office) {
      updateData.office = office;
    }
    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      // get the SecondaryOfficeCollection instance
      const instance = this;
      Meteor.publish(SecondaryOfficePublications.SecondaryOffice, function publish() {
        if (this.userId) {
          return instance._collection.find({});
        }
        return this.ready();
      });
    }
  }

  subscribeSecondaryOffice() {
    if (Meteor.isClient) {
      return Meteor.subscribe(SecondaryOfficePublications.SecondaryOffice);
    }
    return null;
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const measureNumber = doc.measureNumber;
    const code = doc.code;
    const office = doc.office;
    return { measureNumber, code, office };
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or Advisor.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or Advisor.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.OFFICE_APPROVER]);
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const SecondaryOffice = new SecondaryOfficeCollection();
