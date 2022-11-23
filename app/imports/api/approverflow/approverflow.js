import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const ApproverFlowPublications = {
  approverFlow: 'ApproverFlow',
};

class ApproverFlowCollection extends BaseCollection {
  constructor() {
    super('ApproverFlow', new SimpleSchema({
      billNumber: Number,
      billHearing: String,
      billStatus: String,
      originalText: String,
      originalWriteDate: Date,
      writerSubmission: { type: Boolean },
      officeApproved: { type: Boolean, required: false },
      officeApprovedDate: { type: Date, required: false },
      officeText: { type: String, required: false },
      pipeApproved: { type: Boolean, required: false },
      pipeApprovedDate: { type: Date, required: false },
      pipeText: { type: String, required: false },
      finalApproved: { type: Boolean, required: false },
      finalApprovedDate: { type: Date, required: false },
      finalText: { type: String, required: false },
    }));
  }

  /**
   * Defines a new ApproverFlow item.
   * @param name the name of the item.
   * @return {String} the docID of the new document.
   */
  define({ billNumber, writerSubmission, originalText, originalWriteDate, officeApproved, officeApprovedDate, officeText, pipeApproved, pipeApprovedDate, pipeText, finalApproved, finalApprovedDate, finalText }) {
    console.log('Printing approver flow item: ', { originalText, originalWriteDate, officeApproved, officeApprovedDate, officeText, pipeApproved, pipeApprovedDate, pipeText, finalApproved, finalApprovedDate, finalText });
    const docID = this._collection.insert({
      billNumber, originalText, originalWriteDate, writerSubmission, officeApproved, officeApprovedDate, officeText, pipeApproved, pipeApprovedDate, pipeText, finalApproved, finalApprovedDate, finalText,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { billNumber, originalText, writerSubmission, originalWriteDate, officeApproved, officeApprovedDate, officeText, pipeApproved, pipeApprovedDate, pipeText, finalApproved, finalApprovedDate, finalText }) {
    const updateData = {};
    if (billNumber) {
      updateData.billNumber = billNumber;
    }
    if (originalText) {
      updateData.originalText = originalText;
    }
    if (originalWriteDate) {
      updateData.originalWriteDate = originalWriteDate;
    }
    if (writerSubmission != null) {
      updateData.writerSubmission = writerSubmission;
    }
    if (officeApproved != null) {
      updateData.officeApproved = officeApproved;
    }
    if (officeApprovedDate) {
      updateData.officeApprovedDate = officeApprovedDate;
    }
    if (officeText) {
      updateData.officeText = officeText;
    }
    if (pipeApproved != null) {
      updateData.pipeApproved = pipeApproved;
    }
    if (pipeApprovedDate) {
      updateData.pipeApprovedDate = pipeApprovedDate;
    }
    if (pipeText) {
      updateData.pipeText = pipeText;
    }
    if (finalApproved != null) {
      updateData.finalApproved = finalApproved;
    }
    if (finalApprovedDate) {
      updateData.finalApprovedDate = finalApprovedDate;
    }
    if (finalText) {
      updateData.finalText = finalText;
    }
    console.log('Updating method for ', updateData);
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the ApproverFlow associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ApproverFlowCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(ApproverFlowPublications.approverFlow, function publish() {
        if (this.userId) {
          return instance._collection.find({ });
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for ApproverFlow owned by the current user.
   */
  subscribeApproverFlow() {
    if (Meteor.isClient) {
      return Meteor.subscribe(ApproverFlowPublications.approverFlow);
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
    this.assertRole(userId, [ROLE.WRITER, ROLE.FINAL_APPROVER, ROLE.PIPE_APPROVER, ROLE.OFFICE_APPROVER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const quantity = doc.quantity;
    const condition = doc.condition;
    const owner = doc.owner;
    return { name, quantity, condition, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const ApproverFlows = new ApproverFlowCollection();
