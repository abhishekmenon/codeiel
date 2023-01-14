const Friendship = require('../models/friendship');

const User = require('../models/user');

module.exports.addFriend = async function(req, res){

    try{

        let friendship = await Friendship.findOne({
            uid: req.user._id,
            fid: req.params.id
        });

        if(!friendship){
            friendship = await Friendship.create({
                uid: req.user._id,
                fid: req.params.id
            });
            let reverseFriendship = await Friendship.create({
                uid: req.params.id,
                fid: req.user._id
            });
        
            let user = await User.findById(req.user._id);
            let secUser = await User.findById(req.params.id);
        
            user.friends.push(friendship);
            secUser.friends.push(reverseFriendship);
            user.save();
            secUser.save();
            return res.redirect('/');

        } else {
            return res.redirect('/');
        }

       
    } catch(err){
        console.log('Error', err);
    }
    

}

module.exports.removeFriend = async function(req, res){

    try{

        
        let friendship = await Friendship.findOne({
            uid: req.user._id,
            fid: req.params.id
        });
        let reverseFriendship = await Friendship.findOne({
            uid: req.params.id,
            fid: req.user._id
        });

        if(friendship){
            await Friendship.findByIdAndDelete(friendship._id);
            await Friendship.findByIdAndDelete(reverseFriendship._id);
            let user = await User.findById(req.user._id);
            user.friends.pull(friendship._id);
            user.save();

            let secUser = await User.findById(req.params.id);
            secUser.friends.pull(reverseFriendship._id);
            secUser.save();
            if(req.xhr){
                return res.json(200, {
                    data: {
                        friendship: friendship
                    },
                    message: 'Removed Successfully!'
                });
            }
        }

        return res.redirect('/');

    } catch(err){
        console.log('Error', err);
        return;
    }
    

}