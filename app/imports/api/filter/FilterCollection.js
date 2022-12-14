import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const FilterPublications = {
  Filter: 'Filter',
  FilterAdmin: 'FilterAdmin',
};

class FilterCollection extends BaseCollection {
  constructor() {
    super('Filters', new SimpleSchema({
      statusOptions: [{ type: String }],
      officeOptions: [{ type: Object }],
      measureTypeOptions: [{ type: String }],
      dateStateOptions: [{ type: String }],
      owner: String,
    }));
  }

  /**
     * Defines a new Filter item.
     * @param name the name of the item.
     * @param quantity how many.
     * @param owner the owner of the item.
     * @param condition the condition of the item.
     * @return {String} the docID of the new document.
     */
  define({ statusOptions, officeOptions, houseCommitteeOptions, senateCommitteeOptions, measureTypeOptions, dateStateOptions, owner }) {
    const docID = this._collection.insert({ statusOptions, officeOptions, houseCommitteeOptions, senateCommitteeOptions, measureTypeOptions, dateStateOptions, owner });
    return docID;
  }

  /**
   * Updates the given document.
   * @param id
   * @param userOptions
   */
  update(id, userOptions) {
    const updateData = {};
    const { statusOptions, officeOptions, measureTypeOptions, dateStateOptions } = userOptions;
    updateData.statusOptions = statusOptions;
    updateData.officeOptions = officeOptions;
    updateData.measureTypeOptions = measureTypeOptions;
    updateData.dateStateOptions = dateStateOptions;
    this._collection.update(id, { $set: updateData });
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
     * It publishes the entire collection for admin and just the Filter associated to an owner.
     */
  publish() {
    if (Meteor.isServer) {
      // get the FilterCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(FilterPublications.Filter, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });
    }
  }

  /**
     * Subscription method for Filter owned by the current user.
     */
  subscribeFilter() {
    if (Meteor.isClient) {
      return Meteor.subscribe(FilterPublications.Filter);
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.SECRETARY, ROLE.WRITER, ROLE.OFFICE_APPROVER, ROLE.PIPE_APPROVER, ROLE.FINAL_APPROVER]);
  }

  /**
     * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
     * @param docID
     * @return {{owner: (*|number), condition: *, quantity: *, name}}
     */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const statusOptions = doc.statusOptions;
    const officeOptions = doc.officeOptions;
    const houseCommitteeOptions = doc.houseCommitteeOptions;
    const senateCommitteeOptions = doc.senateCommitteeOptions;
    const measureTypeOptions = doc.measureTypeOptions;
    const dateStatusOptions = doc.dateStateOptions;
    return { statusOptions, officeOptions, houseCommitteeOptions, senateCommitteeOptions, measureTypeOptions, dateStatusOptions };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Filters = new FilterCollection();
