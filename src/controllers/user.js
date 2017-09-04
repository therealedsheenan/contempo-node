import mongoose from 'mongoose'
import passport from 'passport'

const User = mongoose.model('User')

/*
* This Controller contains all of the functionalities
* dealing with the users(Schema)
* @param req = express request
* @param res = express respond
* @param next = express next
**/
export default class UserController {
  getUser (req, res, next) {
    User.findById(req.payload.id)
      .then((user) => user ? res.json({ user: user.toAuthJSON() }) : res.sendStatus(400))
      .catch(next)
  }
  updateUser (req, res, next) {
    // getting the user then applying changes
    User
      .findById(req.payload.id)
      .then((user) => {
        if (!user) { return res.sendStatus(401) }

        // only update fields that has value
        if (typeof req.body.user.username !== 'undefined') {
          user.username = req.body.user.username
        }

        if (typeof req.body.user.password !== 'undefined') {
          user.password = req.body.user.password
        }

        if (typeof req.body.user.image !== 'undefined') {
          user.image = req.body.user.image
        }

        if (typeof req.body.user.type !== 'undefined') {
          user.type = req.body.user.type
        }

        if (typeof req.body.user.email !== 'undefined') {
          user.email = req.body.user.email
        }

        // return saved values
        return user
          .save()
          .then(() => res.json({ user: user.toAuthJSON() }))
          .catch(next)
      })
      .catch(next)
  }
  loginUser (req, res, next) {
    /*
    * TODO: check email OR username and password
    * */
    if (!req.body.user.email) {
      return res.status(422).json({errors: {email: "can't be blank"}})
    }

    if (!req.body.user.password) {
      return res.status(422).json({errors: {password: "can't be blank"}})
    }

    // passport strategy
    passport.authenticate('local', {session: false}, function (err, user, info) {
      if (err) { return next(err) }

      if (user) {
        user.token = user.generateJWT()
        return res.json({user: user.toAuthJSON()})
      } else {
        return res.status(422).json(info)
      }
    })(req, res, next)
  }
  newUser (req, res, next) {
    const user = new User()

    user.username = req.body.user.username
    user.email = req.body.user.email
    user.type = req.body.user.type
    user.avatar = req.body.user.avatar
    user.setPassword(req.body.user.password)

    // return jwt json
    user.save().then(() => {
      return res.json({user: user.toAuthJSON()})
    }).catch(next)
  }
  deleteUser (req, res, next) {
    User
      .findById(req.payload.id)
      .then((user) => {
        if (!user) { return res.sendStatus(401) }
        return user
          .remove()
          .then((usr) => {
            return res.json({ message: `User: ${usr.username} was deleted.` })
          })
          .catch(next)
      })
      .catch(next)
  }
}
