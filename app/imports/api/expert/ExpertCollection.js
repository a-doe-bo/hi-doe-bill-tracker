import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const expertPublications = {
    experts: 'experts',
};

class ExpertCollection extends BaseCollection {
    constructor() {
        super('Experts', new SimpleSchema({
            recipient: String,
            bill: String,
        }));
    }

    define ({recipient, bill}) 
    {
        if (this.isDefined({recipient, bill})) {
            return this.findDoc({ recipient, bill })._id;
        }

        const docID = this._collection.insert({ recipient, bill });
        return docID;

    }
    update(docID, { recipient, bill }) {
        const updateData = {};
        if (recipient) {
            updateData.recipient = recipient;
        }
        if (bill) {
            updateData.bill = bill;
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

    dumpOne(docID) {
        const doc = this.findDoc(docID);
        const recipient = doc.recipient;
        const bill = doc.bill;

        return { recipient, bill };
    }

}

export const Experts = new ExpertCollection();
