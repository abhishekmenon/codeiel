module.exports.chatSockets = function(chatServer){

    let io = require('socket.io')(chatServer, {
        cors: {
          origin: "http://localhost:8000",
          methods: ["GET", "POST"]
        }
      });

    io.on('connection', function(socket){
        console.log('new connection recieved', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });

        socket.on('join_room', function(data){
          console.log('joining request recieved', data);
          socket.join(data.chatroom);
          io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_message', function(data){
          console.log('message recieved on server', data);
          io.in(data.chatroom).emit('recieve_message', data);
        });
    });

}