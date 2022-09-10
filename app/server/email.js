import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
let nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f91e4031db2eda",
    pass: "eae77a1efc2109"
  }
});

let mailOptions = {
    from: '"Example Team" <from@example.com>',
    to: 'user1@example.com, user2@example.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer ;) ',
};

Meteor.methods({
    sendEmail() {
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log("email sent");
        });
    }
})
