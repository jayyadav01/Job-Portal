const express = require('express')
const { login, logout, register, update, getAllUser, pictureUpdate } = require("../controllers/user.controller");
const singleupload = require("../middleware/multer");
const isAuthenticated = require('../middleware/isAuthenticated');
const { picture } = require('../utils/cloudnary');

const userRouter = express.Router()

userRouter.route('/register').post(singleupload,register)
userRouter.route('/get').get(getAllUser)
userRouter.route('/login').post(login)
// userRouter.route('/logout').get(logout)
userRouter.route('/profile/update').post(singleupload,update)
userRouter.route('/profile/picture/update').patch(singleupload,pictureUpdate)

module.exports = userRouter