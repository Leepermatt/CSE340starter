// Needed Resources 
const regValidate = require('../utilities/account-validation')
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController"); // Account controller to handle route logic
const utilities = require("../utilities/index"); // Import utilities
const jwt = require("jsonwebtoken")


// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
    "/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Process the login request
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
)

// route to get account in

// Show the account update form
router.get('/update',
    //authenticateJWT,
    accountController.checkLoginStatus,
    utilities.handleErrors(accountController.buildAccountUpdate))

// Process the account update form
router.post('/account/update',
    //authenticateJWT,
    accountController.checkLoginStatus,
    accountController.populateAccountInfo,
    regValidate.updateAccountRules(),
    regValidate.checkUpdateData,
    utilities.handleErrors(accountController.updateAccount))

// Log out the user by clearing the JWT cookie
router.get('/logout',
    utilities.handleErrors(accountController.logout))
//console.log("log out called")



router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement));

module.exports = router;