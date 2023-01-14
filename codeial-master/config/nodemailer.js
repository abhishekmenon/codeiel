const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const environment = require('./environment');

let transporter = nodemailer.createTransport(environment.smtp);

let renderTemplate = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log('Error', err);
                return;
            }
            mailHtml = template;
        }
    )
    return mailHtml;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}