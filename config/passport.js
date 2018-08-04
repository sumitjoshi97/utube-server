const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const keys = require('./keys');

const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
    done(null, user.id);
})

passport.deserializeUser( (id, done) => {
    User.findById(id).then( user => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleID,
            clientSecret: keys.googleSecret,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if(existingUser) {
                return done(null, existingUser)
            }
            const user = await new User({
                googleId: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken,
                name: profile.displayName
            }).save();
            
            done(null, user);
        }
    )
)