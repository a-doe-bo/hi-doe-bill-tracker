import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const RequestedAccountsPublications = {
  accounts: 'accounts',
  accountsAdmin: 'RequestedAccountsAdmin',
};

class RequestedAccountsCollection extends BaseCollection {
  constructor() {
    super('RequestedAccounts', new SimpleSchema({
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      employeeID: String,
      office: String,
      role: String,
    }));
  }

  /**
   * Defines a new Stuff item.
   * @param name the name of the item.
   * @param quantity how many.
   * @param owner the owner of the item.
   * @param condition the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ email, firstName, lastName, password, office, role, employeeID }) {
    const docID = this._collection.insert({
      email, firstName, lastName, password, office, role, employeeID
    });
    return docID;
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(email) {
    const doc = this.findDoc(email);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      Meteor.publish(RequestedAccountsPublications.accounts, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(RequestedAccountsPublications.accountsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for users to subscribe to the collection.
   */
  subscribeRequested() {
    if (Meteor.isClient) {
      return Meteor.subscribe(RequestedAccountsPublications.accounts);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeRequestedAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(RequestedAccountsPublications.accountsAdmin);
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
    // this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
    return true;
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const office = doc.office;
    const role = doc.role;
    const employeeID = doc.employeeID;
    return { email, firstName, lastName, office, role, employeeID };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const RequestedProfiles = new RequestedAccountsCollection();
