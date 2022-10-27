import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';

const mySchema = {
  ...FilesCollection.schema,
};

const SavedTestimoniesCollection = new FilesCollection({
  schema: mySchema,
  storagePath: 'assets/app/uploads/SavedTestimoniesCollection',
  downloadRoute: '/files/SavedTestimonies',
  collectionName: 'SavedTestimonies',
  permissions: 0o755,
  allowClientCode: false,
  cacheControl: 'public, max-age=31536000',
  // Read more about cacheControl: https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers
  onbeforeunloadMessage() {
    console.log('Upload is still in progress! Upload will be aborted if you leave this page!');
  },
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/pdfjpeg formats
    // Note: You should never trust to extension and mime-type here
    // as this data comes from client and can be easily substitute
    // to check file's "magic-numbers" use `mmmagic` or `file-type` package
    // real extension and mime-type can be checked on client (untrusted side)
    // and on server at `onAfterUpload` hook (trusted side)
    if (file.size <= 10485760 && /pdf/i.test(file.ext)) {
      return true;
    }
    console.log('Please upload pdf, with size equal or less than 10MB');
    return false;
  },
  downloadCallback(fileObj) {
    if (this.params.query.download === 'true') {
      // Increment downloads counter
      SavedTestimoniesCollection.update(fileObj._id, { $inc: { 'meta.downloads': 1 } });
    }
    // Must return true to continue download
    return true;
  },
});

if (Meteor.isServer) {
  Meteor.publish('saved_testimonmies', function () {
    return SavedTestimoniesCollection.find().cursor;
  });
}

/**
 * Subscription method for stuff owned by the current user.
 */
const subscribeSavedTestimony = () => {
  if (Meteor.isClient) {
    return Meteor.subscribe('saved_testimonies');
  }
  return null;
};

SavedTestimoniesCollection.collection.attachSchema(new SimpleSchema(mySchema));
export { SavedTestimoniesCollection, subscribeSavedTestimony };
