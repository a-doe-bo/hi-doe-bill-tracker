import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const awaitingTestimonyPublication = {
  awaitingTestimonyPublication: 'awaitingTestimony',
};

class AwaitingTestimonyCollection extends BaseCollection {
  constructor() {
    super('AwaitingTestimony', new SimpleSchema({
      bill_number: Number,
      bill_due_date: String,
      bill_id: String,
      office: String,
      owner: String,
    }));
  }

  /**
     * Defines a new testimony item.
     * @param firstName the first name of the testifier.
     * @param lastName the last name of the testifier.
     * @param position .
     * @return {String} the docID of the new document.
     */
  define({ bill_number, bill_due_date, bill_id, office, owner }) {
    const docID = this._collection.insert({
      bill_number,
      bill_due_date,
      bill_id,
      office,
      owner,
    });
    return docID;
  }

  /**
     * Updates the given document.
     * @param docID the id of the document to update.
     * @param firstName the first name of the testifier (optional).
     * @param lastName the last name of the testifier (optional).
     * @param position (optional).
     * @param testimony (optional).
     */
  update(docID, { bill_number, bill_name, bill_id, bill_due_date, office }) {
    const updateData = {};

    if (bill_number) updateData.bill_number = bill_number;
    if (bill_name) updateData.bill_name = bill_name;
    if (bill_due_date) updateData.bill_due_date = bill_due_date;
    if (bill_id) updateData.bill_id = bill_id;
    if (office) updateData.office = office;

    this._collection.update(docID, { $set: updateData });
  }

  /**
     * Default publication method for entities.
     * It publishes the entire collection for admin and just the stuff associated to an owner.
     */
  publish() {
    if (Meteor.isServer) {
      // get the TestimonyCollection instance.
      const instance = this;
      /** This subscription publishes all testimony to a logged in user */
      Meteor.publish(awaitingTestimonyPublication.awaitingTestimony, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
     * Subscription method for stuff owned by the current user.
     */
  subscribeAwaitingTestimony() {
    if (Meteor.isClient) {
      return Meteor.subscribe(awaitingTestimonyPublication.awaitingTestimony);
    }
    return null;
  }

  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.WRITER]);
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const bill_number = doc.bill_number;
    const bill_name = doc.bill_name;
    const bill_due_date = doc.bill_due_date;
    const bill_id = doc.bill_id;
    const owner = doc.owner;
    return { bill_number, bill_name, bill_due_date, bill_id, owner };
  }
}

export const AwaitingTestimony = new AwaitingTestimonyCollection();
