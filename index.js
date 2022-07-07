const express = require('express');
var bodyParser = require(body-parser);
const app = express();
const mongoose = require('mongoose');
const Users = require('./users');
//const eseeion = require('express-session');

var randomID = gerRandomInt(9999);

var urlencodeParser = bodyParser.urlencoded({extended:false});

//session
app.unsubscribe(session({
    secret: "doasis12345",
    resave: true,
    saveUnititialized: true
}));

function gerRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max).floor(max));
}

mongoose.connect('mongodb+srv://daydev:6Og5udKGHjjdLNHQ@cluster0.ejroo.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

app.get('/',(request, response)=>{
    response.sendFile(__dirname + '/index.html');
});

app.post('/'.urlencodeParser, async (request,response)=>{
    request.session.uid = randomID;
    console.log('body_data:',request.body);
    const user = new Users(
        {
            "uid": request.session.uid,
            "name": request.body["name"],
            "email": request.body["email"],
            "password": request.body["password"],
            "avatar": request.body["avatar"],
        }
    );
    await user.save();
    response.redirect('/thankyou');
});

app.get('/thankyou', (request,response)=>{
    response.sendFile(__dirname + '/thankyou.html');
});