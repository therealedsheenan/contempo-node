// import mongoose from 'mongoose'
import express from 'express'
import auth from '../auth'

import Controller from '../../controllers/user'
const router = express.Router()

// initialize controller
const userController = new Controller()
const { getUser, updateUser, loginUser, newUser, deleteUser } = userController

// get user information
router.get('/', auth.required, getUser)

// update user info
router.put('/', auth.required, updateUser)

// logging in
// checks email and password
router.post('/login', loginUser)

// new user
router.post('/new', newUser)

// deleting user
router.delete('/', auth.required, deleteUser)

export default router
