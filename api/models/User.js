const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secret = require('../config/auth').secret;

const userSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    password: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid']},
    cash: Number,
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
});

userSchema.methods.verifyPassword = function(password) {
    return this.password === password;
};

userSchema.methods.generateJWT = function() {
    return jwt.sign({
        id: this._id,
        username: this.username,
    }, secret, { algorithm: 'HS256'});
};

userSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        password: this.password,
        cash: this.cash,
        token: this.generateJWT()
    };
};

userSchema.methods.play = function(id){
    if(this.games.indexOf(id) === -1){
        this.games.push(id);
    }

    return this.save();
};

userSchema.methods.unplay = function(id){
    this.games.remove(id);
    return this.save();
};

userSchema.methods.isPlaying = function(id){
    return this.games.some(function(gameId){
        return gameId.toString() === id.toString();
    });
};

mongoose.model('User', userSchema);