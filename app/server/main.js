import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import { Meteor } from 'meteor/meteor';
import nodemailer from 'nodemailer';

const smtpconfig = {
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: 'thanemluna@gmail.com',
    pass: 'ADGLIJWn2FdXgZz8',
  },
};

const transporter = nodemailer.createTransport(smtpconfig);

const toAddress = "";
const titleOfBill = "";
const numberOfBill = "";

const hearingMailOptions = { // feed in things from client side code like the toaddress and the text
  from: '"A-DOE-BO" <noreply.adoebo.tracker@gmail.com>',
  to: 'thanemluna@gmail.com', // will be a json object of user(s)
  subject: 'Public Hearing Notice',
  text: 'Hello',
};

const verificationMailOptions = {
  from: '"Example Team" <from@example.com>', // will be user that is currently logged in
  to: 'user1@example.com, user2@example.com', // will be a json object of user(s)
  subject: 'DOE Account Verification',
  text: 'You are receiving this email because your account has been successfully created',
};

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks,no-unused-vars
  sendEmail(recipient, billInfo) {
    transporter.sendMail(hearingMailOptions, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`email sent to ${recipient}`);
    });
  },
  verificationEmail() {
    transporter.sendMail(verificationMailOptions, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('email sent');
    });
  },
});
