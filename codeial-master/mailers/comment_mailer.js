const nodeMailer = require('../config/nodemailer');

module.exports.newComment = (comment) => {

    let htmlString = nodeMailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'aish.rohatgi1008@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
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