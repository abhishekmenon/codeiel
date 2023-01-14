const resetPasswordMailer = require('../mailers/reset_password_mailer');
const ResetPassword = require('../models/reset_password');
const User = require('../models/user');
const crypto = require('crypto');


module.exports.enterEmail = function(req, res){
    return res.render('reset_password', {
        title: 'Reset Password'
    });
}

module.exports.sendEmail = async function(req, res){

    try{

        let user = await User.findOne({email: req.body.email});
        if(!user){
            req.flash('error', 'User does not exits!');
            return res.redirect('/users/sign-up');
        }
        
        let resetPasswordUser = await ResetPassword.findOne({user: user._id});

        if(resetPasswordUser){
            resetPasswordUser.user = user._id;
            resetPasswordUser.isValid = true;
            resetPasswordUser.accessToken = crypto.randomBytes(20).toString('hex');
            resetPasswordUser.save();
        } else {
            resetPasswordUser = await ResetPassword.create({
                user: user._id,
                isValid: true,
                accessToken: crypto.randomBytes(20).toString('hex')
            });
        }

        resetPasswordMailer.resetPassword(user, resetPasswordUser.accessToken);

        return res.send('<h1>A reset Link has been sent to your registered Email Id</h1>')

    } catch(err){
        console.log('error', err);
        return;
    }


}

module.exports.enterPassword = async function(req, res){

    console.log(req.query.accessToken);
    let resetPasswordUser = await ResetPassword.findOne({accessToken: req.query.accessToken});
    console.log('USER',resetPasswordUser);
    return res.render('confirm_password', {
       title: 'Confirm Password',
       resetPasswordUser: resetPasswordUser 
    });
}

module.exports.resetPassword = async function(req, res){

    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    if(password != confirmPassword){
        req.flash('error', 'Password and confirm Password does not match!');
        return res.redirect('back');
    }

    let accessToken = req.query.accessToken;
    let resetPasswordUser = await ResetPassword.findOne({accessToken: accessToken});
    if(!resetPasswordUser.isValid){
        req.flash('error', 'Your token has Expired!');
        return res.redirect('/reset_password/enter_email');
    }
    let user = await User.findOneAndUpdate({_id: resetPasswordUser.user}, {password: password});
    user.save();
    resetPasswordUser.isValid = false;
    resetPasswordUser.save();
    return res.redirect('/users/sign-in');
}