const express = require("express");

const bcrypt = require("bcrypt");
const fs = require("fs");
const session = require("express-session");
const { json } = require("express");

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
    const users = JSON.parse(fs.readFileSync("data/users.json"));

    //
    // E. Checking for the user data correctness
    //
    if(!username ||!avatar || !name || !password){
        res.json({  status: "error",
                    error: "Username/avatar/name/password cannot be empty."});
        return;
    }
    //If the username contains invalid characters, return an error
    if(!containWordCharsOnly(username)){
        res.json({  status: "error",
                    error: "Username can only contain underscores, letters or numbers."});
        return;
    }
    //If username exists, return an error
    if(username in users){
        res.json({  status: "error",
                    error: "Username has already been used"});
        return;
    }
    //
    // G. Adding the new user account
    //
    //Hash the password 
    const hash = bcrypt.hashSync(password, 10)

    //Add the user in the record
    users[username] = {avatar, name, password: hash}

    //
    // H. Saving the users.json file
    //
    //Save the file
    fs.writeFileSync("data/users.json", JSON.stringify(users,null," "));

    //
    // I. Sending a success response to the browser
    //
    res.json({status: "success"})

});

// Handle the /signin endpoint
app.post("/signin", (req, res) => {
    // Get the JSON data from the body
    const { username, password } = req.body;

    //
    // D. Reading the users.json file
    //
    const users = JSON.parse(fs.readFileSync("data/users.json"));
    //
    // E. Checking for username/password
    //
        user = users[username];
        const hashedPassword = user.password
        if (!bcrypt.compareSync(password, hashedPassword)){
            res.json({ status: "error",
            error: "Username or password is incorrect"});
            return;}
    //
    // G. Sending a success response with the user account
    else{
        req.session.user = {username, avatar: user.avatar, name: user.name};
        res.json({status:"success", user:{username, avatar: user.avatar, name: user.name}});

    }
});

// Handle the /validate endpoint
app.get("/validate", (req, res) => {

    //
    // B. Getting req.session.user
    //
    if (!req.session.user){
        res.json({status: "error",error: "You have not signed in."});
        return;
    }

    //
    // D. Sending a success response with the user account
    //
 
    res.json({ status: "success", user: req.session.user });
});

// Handle the /signout endpoint
app.get("/signout", (req, res) => {

    //
    // Deleting req.session.user
    //
    req.session.user=null
    //
    // Sending a success response
    //
    res.json({ status: "success"});
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

//Handle the web socket connection
io.on("connection",(socket)=>{
    //Add a new user to the online user list 
    if(socket.request.session.user){
        const {username, avatar, name} = socket.request.session.user;
        onlineUsers[username]= {avatar,name};
        console.log(onlineUsers);

        //Broadcast the signed-in user
        io.emit("add user",JSON.stringify(socket.request.session.user));
    }

    socket.on("disconnect",()=>{
        if(socket.request.session.user){
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
        const data = new Date();
        const message={
            user: user,
            datatime: data,
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
    
})
//use the session in the Socket.IO server
io.use((socket, next) => {
    chatSession(socket.request, {}, next);
});

// Use a web server to listen at port 8000
httpServer.listen(8000, () => {
    console.log("The chat server has started...");
});