const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');
const auth = require('../auth');

router.get('/user', auth.required, function(req, res, next){
    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }

        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

router.put('/user', auth.required, function(req, res, next){
    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401); }

        // only update fields that were actually passed...
        if(typeof req.body.user.username !== 'undefined'){
            user.username = req.body.username;
        }
        if(typeof req.body.user.password !== 'undefined'){
            user.password = req.body.password;
        }
        if(typeof req.body.user.cash !== 'undefined'){
            user.cash = req.body.cash;
        }

        return user.save().then(function(){
            return res.json({user: user.toAuthJSON()});
        });
    }).catch(next);
});

router.post('/users/login', function(req, res, next){
    if(!req.body.username){
        return res.status(422).json({errors: {username: "can't be blank"}});
    }
    if(!req.body.password){
        return res.status(422).json({errors: {password: "can't be blank"}});
    }

    passport.authenticate('local', {session: false}, function(err, user, info){
        if(err){ return next(err); }

        if(user){
            user.token = user.generateJWT();
            return res.json({user: user.toAuthJSON()});
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
});

router.post('/users', function(req, res, next){
    let user = new User();

    user.username = req.body.username;
    user.password = req.body.password;
    user.cash = 100;

    user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

module.exports = router;