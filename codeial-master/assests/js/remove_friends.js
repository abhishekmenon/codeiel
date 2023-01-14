{
    let deleteButtons = $('.remove-friend-button');
        for(let i = 0; i<deleteButtons.length; i++){
            deleteButtons.eq(i).on('click', function(event){
                event.preventDefault();
                $.ajax({
                    method: 'GET',
                    url: $(this).attr('href'),
                    success: function(data){
                        console.log('hello', data);
                        $(`#${data.data.friendship._id}`).remove();
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
    
            });
        }
}