'use strict'

var nodemailer = require('nodemailer');

let emailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tourism.app2020@gmail.com',
        pass: 'tourism@123'
    }
});

function sendEmail (mailOptions) {
    emailer.sendMail(mailOptions, function(err , info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent to \"" + emailTarget + "\" " + info.response);
        }
    });
}

exports.sendAccountActivation = (emailTarget, name, accountType, link) => {
    let mailOptions = {
        from: 'Tourism App <tourism.app2020@gmail.com>',
        to: emailTarget,
        subject: 'Account Activation',
        html: `<div><h1>Welcome to Tourism App</h1><br><p>Dear ${name},<br><br>Your account of type <strong>${accountType}</strong> has been created!<br>Click on the following link to activate your account: ${link}<br><strong>Note: The link is valid for 12 hours only!</strong><br><br>Regards,<br>Tourism App</p></div>`
    };
  
    sendEmail(mailOptions);
}