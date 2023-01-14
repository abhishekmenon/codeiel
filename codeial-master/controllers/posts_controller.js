const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require('../models/likes');


module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){

            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!'
            });
        }

        req.flash('success', 'Post Created Successfully');
        return res.redirect('back');
    } catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.destroy = async function(req, res){

    try {
        let id = req.params.id;
        let post = await Post.findById(id);
        if(post){
            if(post.user == req.user.id){

                await Like.deleteMany({likeable: post._id, onModel: 'Post'});

                await Like.deleteMany({_id: {$in: post.comments}});

                post.remove();

                await Comment.deleteMany({post: req.params.id});

                if(req.xhr){

                    return res.status(200).json({
                        data: {
                            post_id: id
                        },
                        message: "Post deleted Successfully!"
                    });
                }

                req.flash('success', 'Post Deleted Successfully');

                return res.redirect('back');

            } else {
                return res.redirect('back');
            }
        } else {
            return res.redirect('back');
        }
    } catch(err){
        console.log('Error', err);
    }
    
}