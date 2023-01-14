const Post = require('../../../models/post');

module.exports.posts = async function(req, res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user', '-password')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
                select: '-password'
            }
        });

    return res.status(200).json({
        data: {
            post: posts
        },
        message: 'List of Post'
    });
}

module.exports.destroy = async function(req, res){

    try {
        let id = req.params.id;
        let post = await Post.findById(id);
        if(post){

            if(post.user == req.user.id){
                post.remove();

                await Comment.deleteMany({post: req.params.id});

                return res.status(200).json({
                    message: 'Post and related Comments Deleted Successfully!'
                });
            } else {
                return res.status(401).json({
                    message: 'You cannot delete the Post'
                });
            }
                

            } 
    } catch(err){
        console.log('Error', err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
    
}