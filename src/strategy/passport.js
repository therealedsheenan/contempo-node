import passport from 'passport'
import passportLocal from 'passport-local'
import mongoose from 'mongoose'

const LocalStrategy = passportLocal.Strategy
const User = mongoose.model('User')

// login passport strategy
passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function (email, password, done) {
  User.findOne({email: email}).then(function (user) {
    if (!user || !user.validPassword(password)) {
      return done(null, false, {errors: {'email or password': 'is invalid'}})
    }

    return done(null, user)
  }).catch(done)
}))
