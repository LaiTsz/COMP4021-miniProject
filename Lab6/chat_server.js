const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const session = require("express-session");

// Create the Express app
const app = express();

// Use the 'public' folder to serve static files
app.use(express.static("public"));

// Use the json middleware to parse JSON data
app.use(express.json());

// Use the session middleware to maintain sessions
const chatSession = session({
    secret: "game",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 300000 }
});
app.use(chatSession);

// This helper function checks whether the text only contains word characters
function containWordCharsOnly(text) {
    return /^\w+$/.test(text);
}

// Handle the /register endpoint
app.post("/register", (req, res) => {
    // Get the JSON data from the body
    const { username, avatar, name, password } = req.body;

    //
    // D. Reading the users.json file
    //
    const users= JSON.parse(fs.readFileSync("data/users.json"));
    //
    // E. Checking for the user data correctness
    //
    if (!username || !avatar || !name || !password){
        res.json({  status: "error",
                    error: "Username/avatar/name/password cannot be empty." });
        return;
    }

    if (!containWordCharsOnly(username)){
        res.json({  status: "error",
        error: "Username can only contain underscores, letters or numbers." });
        return;
    }
    if (username in users){
        res.json({  status: "error",
        error: "Username has already been used." });
        return;
    }

    //
    // G. Adding the new user account
    //
    const hash = bcrypt.hashSync(password, 10);

    users[username] = {avatar, name, password: hash};
    //
    // H. Saving the users.json file
    //
    fs.writeFileSync("data/users.json", JSON.stringify(users, null, "  "));
    //
    // I. Sending a success response to the browser
    //
    res.json({ status: "success"});
    // Delete when appropriate
    // res.json({ status: "error", error: "This endpoint is not yet implemented." });
});

// Handle the /signin endpoint
app.post("/signin", (req, res) => {
    // Get the JSON data from the body
    const { username, password } = req.body;

    //
    // D. Reading the users.json file
    //
    const users= JSON.parse(fs.readFileSync("data/users.json"));
    //
    // E. Checking for username/password
    //
    
    if (username in users){
        
        if (!bcrypt.compareSync(password, users[username].password)) {
            res.json({  status: "error",
            error: "Incorrect username/password." });
            return;
        };
    }
    else{
        res.json({  status: "error",
        error: "Incorrect username/password." });
        return;
    }

    //
    // G. Sending a success response with the user account
    //
    //  req.session.user = users[username] ;
    //  res.json({ status: "success", user: users[username] });

    //  req.session.user = { username, avatar: users.avatar, name: users.name };
    //  res.json({ status: "success", user: { username, avatar: users.avatar, name: users.name } });

     req.session.user = { username, avatar: users[username].avatar, name: users[username].name };
     res.json({ status: "success", user: { username, avatar: users[username].avatar, name: users[username].name } });
 
    // Delete when appropriate
    // res.json({ status: "error", error: "This endpoint is not yet implemented." });
});

// Handle the /validate endpoint
app.get("/validate", (req, res) => {

    //
    // B. Getting req.session.user
    //
    if (!req.session.user){
        res.json({ status: "error", error: "You have not signed in." });
        return;
    }

    //
    // D. Sending a success response with the user account
    //
    res.json({ status: "success", user: req.session.user });

    // Delete when appropriate
    // res.json({ status: "error", error: "This endpoint is not yet implemented." });
});

// Handle the /signout endpoint
app.get("/signout", (req, res) => {

    //
    // Deleting req.session.user
    //
    delete req.session.user;
    //
    // Sending a success response
    //
    res.json({ status: "success" });
 
    // Delete when appropriate
    // res.json({ status: "error", error: "This endpoint is not yet implemented." });
});


//
// ***** Please insert your Lab 6 code here *****
//

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer( app );
const io = new Server(httpServer);

//A JavaScript object storing the online users
const onlineUsers = {}
let playerCount=0
//Handle the web socket connection
io.on("connection",(socket)=>{
    //Add a new user to the online user list 
    if(socket.request.session.user){
        playerCount++
        const {username, avatar, name} = socket.request.session.user;
        onlineUsers[username]= {avatar,name};
        console.log(onlineUsers);

        //Broadcast the signed-in user
        io.emit("add user",JSON.stringify(socket.request.session.user));
        if(playerCount==2){
            io.emit("game start");
        }
    }

    socket.on("disconnect",()=>{
        if(socket.request.session.user){
            playerCount--;
            const {username} = socket.request.session.user;
            if(onlineUsers[username]) delete onlineUsers[username];
            console.log(onlineUsers);

            //Broadcast the signed-in user
            io.emit("remove user",JSON.stringify(socket.request.session.user));
            }
    });

    socket.on("get users",()=>{
        //Send the online users to the browser
        socket.emit("users",JSON.stringify(onlineUsers));
    });
    socket.on("get messages",()=>{
        //Send the chatroom messages to the browser
        const message = JSON.parse(fs.readFileSync("data/chatroom.json"))
        socket.emit("messages",JSON.stringify(message))
    })
    socket.on("post message",(content) =>{
       
        const user = socket.request.session.user;
        const message={
            user: user,
            datetime: new Date(),
            content: content
        }
        const chatroom = JSON.parse(fs.readFileSync("data/chatroom.json"));
        chatroom.push(message);
        fs.writeFileSync("data/chatroom.json", JSON.stringify(chatroom,null," "));
        io.emit("add message",JSON.stringify(message));
    })
    socket.on("get users",()=>{
        //Send the online users to the browser
        socket.emit("users",JSON.stringify(onlineUsers));
    });
    socket.on("add typing",()=>{
        const user = socket.request.session.user;
        console.log(user);
        const name = user.name;
        console.log(name)
        io.emit("add typing",name);
    })
    socket.on("score update",(score)=>{
        socket.broadcast.emit('client score',score)
    })
    socket.on("player update",(position)=>{
        socket.broadcast.emit('client position',{x:position.x,y:position.y})
    })
    socket.on("coin update",(position)=>{
        socket.broadcast.emit('client coin',{x:position.x,y:position.y})
    })
    socket.on("heart update",(position)=>{
        socket.broadcast.emit('client heart',position);
    })
    socket.on("bullet update",(position)=>{
        socket.broadcast.emit('client bullet',position);
    })
    socket.on("monster update",(position)=>{
        socket.broadcast.emit('client monster',position);
    })
    socket.on("get Damage",()=>{
        socket.broadcast.emit('reduce client life');
    })
})
//use the session in the Socket.IO server
io.use((socket, next) => {
    chatSession(socket.request, {}, next);
});

// Use a web server to listen at port 8000
httpServer.listen(8000, () => {
    console.log("The chat server has started...");
});