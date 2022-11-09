import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { isValidOfficeType } from '../legislature/officeTypes';

export const PrimaryOfficePublications = {
  PrimaryOffice: 'PrimaryOffice',
};

class PrimaryOfficeCollection extends BaseCollection {
  constructor() {
    super('PrimaryOffice', new SimpleSchema({
      measureNumber: Number,
      code: { type: String },
      office: { type: String },
    }));
  }

  define({ measureNumber, code, office }) {
    // PRIMARY KEY (year, PrimaryOfficeType, PrimaryOfficeNumber) so they are unique
    if (this.isDefined({ code, measureNumber, office })) {
      return this.findDoc({ code, measureNumber, office })._id;
    }
    if (!isValidOfficeType(office)) {
      throw new Meteor.Error(`${office} is an invalid PrimaryOffice Type.`);
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
      // get the PrimaryOfficeCollection instance
      const instance = this;
      Meteor.publish(PrimaryOfficePublications.PrimaryOffice, function publish() {
        if (this.userId) {
          return instance._collection.find({});
        }
        return this.ready();
      });
    }
  }

  subscribePrimaryOffice() {
    if (Meteor.isClient) {
      return Meteor.subscribe(PrimaryOfficePublications.PrimaryOffice);
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
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const PrimaryOffice = new PrimaryOfficeCollection();
