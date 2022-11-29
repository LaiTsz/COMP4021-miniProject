const Socket = (function() {
    // This stores the current Socket.IO socket
    let socket = null;

    // This function gets the socket from the module
    const getSocket = function() {
        return socket;
    };
    // This function connects the server and initializes the socket
    const connect = function() {
        socket = io();

        // Wait for the socket to connect successfully
        socket.on("connect", () => {
            // Get the online user list
            socket.emit("get users");

            // Get the chatroom messages
            socket.emit("get messages");
        });

        // Set up the users event
        socket.on("users", (onlineUsers) => {
            onlineUsers = JSON.parse(onlineUsers);

            // Show the online users
            OnlineUsersPanel.update(onlineUsers);
        });

        // Set up the add user event
        socket.on("add user", (user) => {
            user = JSON.parse(user);

            // Add the online user
            OnlineUsersPanel.addUser(user);
        });

        // Set up the remove user event
        socket.on("remove user", (user) => {
            user = JSON.parse(user);

            // Remove the online user
            OnlineUsersPanel.removeUser(user);
        });

        // Set up the messages event
        socket.on("messages", (chatroom) => {
            chatroom = JSON.parse(chatroom);

            // Show the chatroom messages
            ChatPanel.update(chatroom);
        });

        // Set up the add message event
        socket.on("add message", (message) => {
            message = JSON.parse(message);

            // Add the message to the chatroom
            ChatPanel.addMessage(message);
        });
        socket.on("add typing",(name)=>{
            ChatPanel.changeTyping(name);
        })
        socket.on("game start",()=>{
            gameStart();
        })
        socket.on("client score",(score)=>{
            clientPos.updateClientScore(score);
        })
        socket.on("client position",(position)=>{
            clientPos.updateClientPos(position.x,position.y);
        })
        socket.on("client coin",(position)=>{
            clientPos.updateCoinPos(position.x,position.y);
        })
        socket.on("client heart",(position)=>{
            clientPos.updateHeart(position);
        })
        socket.on("client bullet",(position)=>{
            clientPos.updateBullet(position);
        })
        socket.on("client monster",(position)=>{
            clientPos.updateMonster(position);
        })
        socket.on("reduce client life",()=>{
            clientPos.reduceClientLife();
        })
        socket.on("Ranking",(score1,score2,score3,username1,username2,username3)=>{
            console.log(score1);
            console.log(username1);
            $("#rank1").text(username1 +"   "+ score1);
            $("#rank2").text(username2 +"   "+ score2);
            $("#rank3").text(username3 +"   "+ score3);
        })
        
    };

    // This function disconnects the socket from the server
    const disconnect = function() {
        socket.disconnect();
        socket = null;
    };

    // This function sends a post message event to the server
    const postMessage = function(content) {
        if (socket && socket.connected) {
            socket.emit("post message", content);
        }
    };
    const typingMessage = function(){
        socket.emit("add typing");
    }

    const scoreUpdate =function(score){
        socket.emit('score update',score);
    }
    const playerPositionUpdate =function(posX,posY){
        socket.emit('player update',{x:posX,y:posY});
    }
    const coinPositionUpdate =function(posX,posY){
        socket.emit('coin update',{x:posX,y:posY});
    }
    const heartPositionUpdate =function(arrayOfXY){
        socket.emit('heart update',arrayOfXY);
    }
    const bulletPositionUpdate =function(arrayOfXY){
        socket.emit('bullet update',arrayOfXY);
    }
    const monsterPositionUpdate =function(arrayOfXY){
        socket.emit('monster update',arrayOfXY);
    }
   
    const hitMonster = function(){
        socket.emit('get Damage');
    }
    const scoreRanking = function(score) {
        if (socket && socket.connected) {
            socket.emit("user score", score);
        }
    };
    
    return { getSocket, connect, disconnect, postMessage,typingMessage,scoreUpdate,playerPositionUpdate,
        coinPositionUpdate,heartPositionUpdate,bulletPositionUpdate,monsterPositionUpdate,hitMonster, scoreRanking,};
})();
