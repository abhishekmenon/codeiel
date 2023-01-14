const User = require("../models/user");
const path = require('path');
const fs = require('fs');

module.exports.profile = async function(req, res){

    try{
        let user = await User.findById(req.params.id);

        let current_user = await User.findById(req.user._id).populate('friends');

        let friend = current_user.friends.find(obj => obj.fid == req.params.id);

        let isFriend = false;
        if(friend){
            isFriend = true;
        }

        return res.render('user_profile', {
            title: 'User Profile Page',
            profile_user: user,
            isFriend: isFriend
        });
    } catch(err){
        console.log('Error', err);
        return;
    }
        
}

module.exports.profileUpdate = async function(req, res){
    if(req.user.id == req.params.id){
        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                console.log(req.file);
                if(err){
                    console.log('Error in Multer', err);
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname, '..', user.avatar))){
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                    }
                    user.avatar = path.join(User.avatar_path, '/' , req.file.filename);
                    console.log(user.avatar);
                }
                user.save();
                return res.redirect('back');
            });
        } catch(err){

            console.log('Error', err);
            return;

        }
       

    } else {
        return res.status(401).send('Unathourized');
    }
}


module.exports.usersPosts = function(req, res){
    return res.send('<h1>User Posts Working fine</h1>');
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
}

module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Sign In'
    });
}

module.exports.create = async function(req, res){
    // let data = req.body;
    // console.log(data);
    try{
        if(req.body.password != req.body.confirm_password){
            req.flash('error', 'Password and Confirm Password are not same');

            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
            if(!user){
                await User.create(req.body);
                return res.redirect('/users/sign-in');
            } else {
                req.flash('error', 'User with same email exits, try different email..!!');
                return res.redirect('back');
            }

    } catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.createSession = function(req, res){
    let data = req.body;
    console.log(data);
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged out Successfully');
    return res.redirect('/');
}

