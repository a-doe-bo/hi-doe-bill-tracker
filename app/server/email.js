import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 587,
  auth: {
    user: 'f91e4031db2eda',
    pass: 'eae77a1efc2109' ,
  },
});

let hearingMailOptions = {
    from: '"DOE" <no-reply@DOE.com>', // will be user that is currently logged in
    to:'lunathane28@gmail.com', // will be a json object of user(s)
    subject: 'Public Hearing Notice',
    text: "", 
    /* text will have the following data:
        * Measure Title(s),
        * Measure Date(s),
        * Measure Location(s),
        * Current Measure State(s) / log difference
    */
};

let verificationMailOptions = {
    from: '"Example Team" <from@example.com>', // will be user that is currently logged in
    to: 'user1@example.com, user2@example.com', // will be a json object of user(s)
    subject: 'DOE Account Verification', 
    text: 'You are receiving this email because your account has been successfully created',
}

Meteor.methods({
    sendEmail() {
        transport.sendMail(hearingMailOptions, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('email sent');
        });
    },
    verificationEmail() {
        transport.sendMail(verificationMailOptions, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('email sent');
        });
    },
});
