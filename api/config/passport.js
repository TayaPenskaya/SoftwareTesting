const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (!user || !user.verifyPassword(password)) {
                return done(null, false, {errors: {'username or password': 'is invalid'}});
            }
            return done(null, user);
        }).catch(done);
    }
));