const router = require('express').Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const userController = require('./../controllers/userController');


router
    .patch("/update-my-password", isLoggedIn, userController.updateMyPassword)
    .get("/me", isLoggedIn, userController.getMyData)
    .patch("/", isLoggedIn, userController.updateMyData)
    .delete("/", isLoggedIn, userController.deleteMe)


module.exports = router;