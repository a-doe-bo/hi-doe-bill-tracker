import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import { Meteor } from 'meteor/meteor';
import nodemailer from 'nodemailer';

// eslint-disable-next-line global-require
const ck = require('ckey');

const smtpconfig = {
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: ck.REACT_APP_EMAIL,
    pass: ck.REACT_APP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpconfig);
// const toAddress = "";
// let numberOfBill = '';
// let theRecipient = '';

const mailOptions = (recipient, billNumber) => ({ // feed in things from client side code like the toaddress and the text
  from: '"A-DOE-BO" <noreply.adoebo.tracker@gmail.com>',
  to: 'noreply.adoebo.tracker@gmail.com', // will be a json object of user(s)
  subject: 'Notification For Saved Bill',
  text: `Saved Bill Number ${billNumber}`,
});

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks,no-unused-vars
  sendEmail(recipient, billNumber) {
    // eslint-disable-next-line consistent-return
    transporter.sendMail(mailOptions(recipient, billNumber), (err) => {
      if (err) {
        // An error occurred
      }
    });
  },
});
