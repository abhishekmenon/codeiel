
{   
    // console.log('hello');

    let button = $('#new-posts-form button');
    button.on('click', function(event){
        let content = $('#new-posts-form #content').val();
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/posts/create',
            data: {
                content: content
            },
            success: function(data){
                console.log(data);
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                new ToggleLike($(' .toggle-like-button', newPost));
                new Noty({
                    theme: 'relax',
                    text: "Post published!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
                new PostComments(data.data.post._id);
                deletePost();
            },
            error: function(err){
                console.log(err);
            }
        });
    });

    let newPostDom = function(i){
        return $(`<li id="post-${ i._id }">
        <div>
            <span><a class="delete-post-button" href="/posts/destroy/${i._id}">X</a></span>
            <p>${i.content}</p>
            <span>${ i.user.name}</span>
            <small>
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${ i._id }&type=Post">
                    0Likes
                </a>
            </small>
        </div>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Add comment.." required>
                    <input type="hidden" name="post" value="${ i._id }">
                    <button type="submit">Submit</button>
                </form>
            <div id="comments-list">
                <ul>
                   
                </ul>
            </div>
        </div>
    </li>`);
    }

    let deletePost = function(){
        let deleteButtons = $('.delete-post-button');
        for(let i = 0; i<deleteButtons.length; i++){
            deleteButtons.eq(i).on('click', function(event){
                event.preventDefault();
                $.ajax({
                    method: 'GET',
                    url: $(this).attr('href'),
                    success: function(data){
                        console.log('hello', data);
                        $(`#post-${data.data.post_id}`).remove();
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
    
            });
        }

    }
    
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            // get the post's id by splitting the id attribute
            let postId = $(this).prop('id').split("-")[1];
            new PostComments(postId);
        });
    }
    convertPostsToAjax();
    deletePost();
    
    $('.toggle-like-button').each(function(){
        let self = $(this);
        let toggleLike = new ToggleLike(self);
    });

}