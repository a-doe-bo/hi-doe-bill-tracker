import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import nodemailer from 'nodemailer';

const smtpconfig = {
  host: 'smtp.sendgrid.net',
  port: 465,
  auth: {
    user: "apikey",
    pass:  "4Z4_G5M-RsqgtTO7fNbfvA"
  }
};

const transporter = nodemailer.createTransport(smtpconfig);

const hearingMailOptions = {
    from: 'thanel@hawaii.edu', // will be user that is currently logged in
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
            console.log('email sent to ');
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
