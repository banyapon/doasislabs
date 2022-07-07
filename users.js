const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    uid: Number,
    name: String,
    email: String,
    password: String,
    avatar: String
});