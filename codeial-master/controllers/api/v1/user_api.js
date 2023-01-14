const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const environment = require('../../../config/environment');

module.exports.createSession = async function(req, res){
    try {
        
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'Invalid Username or Password'
            });
        }

        return res.status(200).json({
            data: {
                token: jwt.sign(user.toJSON(), environment.jwt_secret_key, {expiresIn: '100000'})
            },
            message: 'Here is Your Token!'
        });

    } catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }

}