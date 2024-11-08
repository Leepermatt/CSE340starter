// Needed Resources 
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController"); // Account controller to handle route logic
// const utilities = require("../utilities/index"); // Import utilities


router.get("/login", accountController.buildLogin);

router.get("/register", accountController.buildRegister)

/// new route
//router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router;