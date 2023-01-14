const nodeMailer = require('../config/nodemailer');

module.exports.resetPassword = function(user, accessToken){

    let htmlString = nodeMailer.renderTemplate(
        {
            user: user,
            accessToken: accessToken
        }, '/reset_password/reset_password.ejs');

    nodeMailer.transporter.sendMail({
        from: 'aish.rohatgi1008@gmail.com',
        to: user.email,
        subject: 'Reset Password',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error', err);
            return;
        }
        console.log("Message Sent", info);
        return;
    });
}