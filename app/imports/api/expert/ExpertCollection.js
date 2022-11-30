import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const expertPublications = {
  experts: 'experts',
};

class ExpertCollection extends BaseCollection {
  constructor() {
    super('Experts', new SimpleSchema({
      recipient: String,
      secretary: String,
      bill_name: String,
      bill_number: Number,
      bill_status: String,
      bill_hearing: String,
    }));
  }

  define({ secretary, recipient, bill_number, bill_name, bill_status, bill_hearing }) {
    if (this.isDefined({ secretary, recipient, bill_number, bill_name, bill_status, bill_hearing })) {
      return this.findDoc({ secretary, recipient, bill_number, bill_name, bill_status, bill_hearing })._id;
    }

    const docID = this._collection.insert({ secretary, recipient, bill_number, bill_name, bill_status, bill_hearing });
    return docID;

  }

  update(docID, { secretary, recipient, bill_number, bill_name, bill_status, bill_hearing }) {
    const updateData = {};
    if (secretary) {
      updateData.secretary = secretary;
    }
    if (recipient) {
      updateData.recipient = recipient;
    }
    if (bill_number) {
      updateData.bill_number = bill_number;
    }
    if (bill_name) {
      updateData.bill_name = bill_name;
    }
    if (bill_status) {
      updateData.bill_status = bill_status;
    }
    if (bill_hearing) {
      updateData.bill_hearing = bill_hearing;
    }

    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      // get the MeasureCollection instance
      const instance = this;
      Meteor.publish(expertPublications.experts, function publish() {
        if (this.userId) {
          return instance._collection.find({});
        }
        return this.ready();
      });
    }
  }

  subscribeToExpert() {
    if (Meteor.isClient) {
      return Meteor.subscribe(expertPublications.experts);
    }
    return null;
  }

  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.SECRETARY]);
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const recipient = doc.recipient;
    const bill_number = doc.bill_number;
    const bill_name = doc.bill_name;
    const bill_status = doc.bill_status;
    const bill_hearing = doc.bill_hearing;

    return { recipient, bill_number, bill_name, bill_status, bill_hearing };
  }

}

export const Experts = new ExpertCollection();
