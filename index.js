const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Users = require('./users');

var randomID = gerRandomInt(9999);
const port = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({extended:false});

function gerRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max));
}
mongoose.connect('mongodb+srv://daydevth:3qpJcFYXvnBdtNe7@cluster0.ejroo.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

app.get('/',(request, response)=>{
    response.sendFile(__dirname + '/index.html');
});

app.post('/',urlencodedParser, async (request,response)=>{
    console.log('body_data:',request.body);
    const user = new Users(
        {
            "uid": randomID,
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

app.listen(port, () => {
    console.log("Starting node.js at port " + port);
  });