import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../stuff/StuffCollection';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { UserProfiles } from '../user/UserProfileCollection';
import { Hearings } from '../hearing/HearingCollection';
import { Measures } from '../measure/MeasureCollection';
<<<<<<< HEAD
import { RequestedProfiles } from '../user/RequestedAccountsCollection';
=======
import { Filters } from '../filter/FilterCollection';
>>>>>>> 032442f05c8d4ae57228c0b3a1b9bb565394655d

class MATPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    // list of all the MATP collections
    this.collections = [
      AdminProfiles,
      Hearings,
      Measures,
      Stuffs,
      UserProfiles,
<<<<<<< HEAD
      RequestedProfiles,
=======
      Filters,
>>>>>>> 032442f05c8d4ae57228c0b3a1b9bb565394655d
    ];
    /*
     * A list of collection class instances in the order required for them to be sequentially loaded from a file.
     */
    this.collectionLoadSequence = [
      AdminProfiles,
      UserProfiles,
      Stuffs,
    ];

    /*
     * An object with keys equal to the collection name and values the associated collection instance.
     */
    this.collectionAssociation = {};
    this.collections.forEach((collection) => {
      this.collectionAssociation[collection.getCollectionName()] = collection;
    });

  }

  /**
   * Return the collection class instance given its name.
   * @param collectionName The name of the collection.
   * @returns The collection class instance.
   * @throws { Meteor.Error } If collectionName does not name a collection.
   */
  getCollection(collectionName) {
    // console.log('MATP', collectionName, this.collectionAssociation);
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called MARTP.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATP = new MATPClass();
