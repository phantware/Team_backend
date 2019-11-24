const express = require('express');
const controllers = require('../controller/userController');
const middleware = require('../middleware/userValidation');
// const { isAdminUser } =('../middleware/authUser');


const { createAccount } = controllers

 const { createEmployeeValidation } = middleware
 
const userRouter = express.Router();

userRouter.post('/auth/create-user', createEmployeeValidation, createAccount);
console.log('userRoute create user');

module.exports = userRouter;