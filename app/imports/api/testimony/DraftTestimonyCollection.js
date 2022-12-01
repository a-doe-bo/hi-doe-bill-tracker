import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const draftTestimonyPublications = {
  draftATestimony: 'DraftATestimony',
};

class DraftTestimonyCollection extends BaseCollection {
  constructor() {
    super('Testimonies', new SimpleSchema({
      bill_number: Number,
      position: {
        type: String,
        allowedValues: ['Support', 'Oppose', 'Comments Only'],
      },
      status: {
        type: String,
        allowedValues: 'Draft',
      },
      pdfFile: String,
      owner: String,
    }));
  }

  /**
   * Defines a new testimony item.
   * @param position .
   * @return {String} the docID of the new document.
   */
  define({ bill_number, position, status, pdfFile, owner }) {
    const docID = this._collection.insert({
      bill_number,
      position,
      status,
      pdfFile,
      owner,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param position (optional).
   * @param testimony (optional).
   */
  update(docID, { bill_number, pdfFile }) {
    const updateData = {};
    if (bill_number) {
      updateData.bill_number = bill_number;
    }
    if (pdfFile) {
      updateData.pdfFile = pdfFile;
    }
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
      Meteor.publish(draftTestimonyPublications.draftATestimony, function publish() {
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
  subscribeADraftTestimony() {
    if (Meteor.isClient) {
      return Meteor.subscribe(draftTestimonyPublications.draftATestimony);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.WRITER]);
  }
}

export const DraftATestimony = new DraftTestimonyCollection();
