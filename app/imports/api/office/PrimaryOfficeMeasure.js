import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { isValidPrimaryOfficeType } from '../legislature/PrimaryOfficeTypes';

export const PrimaryOfficePublications = {
  PrimaryOffice: 'PrimaryOffice',
  PrimaryOfficeAdmin: 'PrimaryOfficeAdmin', // not sure if we need this.
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
    if (!isValidPrimaryOfficeType(office)) {
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
      Meteor.publish(PrimaryOfficePublications.PrimaryOfficeAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
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

  subscribePrimaryOfficeAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(PrimaryOfficePublications.PrimaryOfficeAdmin);
    }
    return null;
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const year = doc.year;
    const PrimaryOfficeType = doc.PrimaryOfficeType;
    const PrimaryOfficeNumber = doc.PrimaryOfficeNumber;
    const lastUpdated = doc.lastUpdated;
    const code = doc.code;
    const PrimaryOfficePdfUrl = doc.PrimaryOfficePdfUrl;
    const PrimaryOfficeArchiveUrl = doc.PrimaryOfficeArchiveUrl;
    const PrimaryOfficeTitle = doc.PrimaryOfficeTitle;
    const reportTitle = doc.reportTitle;
    const bitAppropriation = doc.bitAppropriation;
    const description = doc.description;
    const status = doc.status;
    const introducer = doc.introducer;
    const currentReferral = doc.currentReferral;
    const companion = doc.companion;
    return { year, PrimaryOfficeType, PrimaryOfficeNumber, lastUpdated, code, PrimaryOfficePdfUrl, PrimaryOfficeArchiveUrl, PrimaryOfficeTitle, reportTitle, bitAppropriation, description, status, introducer, currentReferral, companion };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const PrimaryOffice = new PrimaryOfficeCollection();
