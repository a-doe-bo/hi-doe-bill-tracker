import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const savedPublications = {
  saved: 'saved'
}

class SavedBillCollection extends BaseCollection {
  constructor() {
    super('Saved', new SimpleSchema({
      bill_number: Number,
      bill_name: String,
      bill_status: String,
      bill_hearing: Number,
    }));
  }

  define({ bill_number, bill_name, bill_status, bill_hearing }) {
    if (this.isDefined({ bill_number, bill_name, bill_status, bill_hearing })) {
      return this.findDoc({ bill_number, bill_name, bill_status, bill_hearing })._id;
    }
    const docID = this._collection.insert({ bill_number, bill_name, bill_status, bill_hearing });
    return docID;
  }

  update(docID, { bill_number, bill_name, bill_status, bill_hearing }) {
    const updateData = {};

    if (bill_number) updateData.bill_number = bill_number;
    if (bill_name) updateData.bill_name = bill_name;
    if (bill_status) updateData.bill_status = bill_status;
    if (bill_hearing) updateData.bill_hearing = bill_hearing;

    this._collection.update(docID, { $set: updateData });
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(savedPublications.saved, function publish() {
        if (this.userId)
          return instance._collection.find({});
        return this.ready();
      });
    }
  }

  subscribeToSavedBill()
  {
    if (Meteor.isClient) return Meteor.subscribe(savedPublications.saved);
    return null;
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const bill_number = doc.bill_number;
    const bill_name = doc.bill_name;
    const bill_status = doc.bill_status;
    const bill_hearing = doc.bill_hearing;
    return { bill_number, bill_name, bill_status, bill_hearing };
  }

}

export const Saved = new SavedBillCollection();
