'use strict'

var nodemailer = require('nodemailer');

let emailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tourism123app@gmail.com',
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

exports.sendAdminSignUpEmail = (emailTarget, link) => {
    let mailOptions = {
        from: 'Tourism App <tourism123app@gmail.com>',
        to: emailTarget,
        subject: 'Admin Sign Up',
        html: `<div><h1>Admin Sign Up</h1><br><p>Dear Sir/Madam,<br><br>Click on the following link to create your admin account: ${link}<br><br>Regards,<br>Tourism App</p></div>`
    };
  
    sendEmail(mailOptions);
}

exports.sendForgotPasswordEmail = (emailTarget, name, accountType, link) => {
    let mailOptions = {
        from: 'Tourism App <tourism123app@gmail.com>',
        to: emailTarget,
        subject: 'Reset Password',
        html: `<div><h1>Reset Password</h1><br><p>Dear ${name},<br><br>Your account of type <strong>${accountType}</strong> has requested for password to be reset!<br>Click on the following link to reset your password: ${link}<br><strong>Note: The link is valid for 12 hours only!</strong><br><br>Regards,<br>Tourism App</p></div>`
        
    };
    console.log(link)

    console.log("Email sending")
  
    sendEmail(mailOptions);
}