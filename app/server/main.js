import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import { Meteor } from 'meteor/meteor';
import nodemailer from 'nodemailer';

const smtpconfig = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: "f91e4031db2eda",
    pass:  "eae77a1efc2109"
  }
};

const transporter = nodemailer.createTransport(smtpconfig);

const hearingMailOptions = {
    from: 'no334248@gmail.com', // will be user that is currently logged in
    to: 'lunathane28@gmail.com', // will be a json object of user(s)
    subject: 'Public Hearing Notice',
    text: "Hello", 
};

const verificationMailOptions = {
    from: '"Example Team" <from@example.com>', // will be user that is currently logged in
    to: 'user1@example.com, user2@example.com', // will be a json object of user(s)
    subject: 'DOE Account Verification', 
    text: 'You are receiving this email because your account has been successfully created',
}

Meteor.methods({
    sendEmail() {
        transporter.sendMail(hearingMailOptions, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('email sent to ' + recipient);
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
