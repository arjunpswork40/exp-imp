const express = require("express");
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../app/models/User')

const { getLoginPage, logout } = require('../../../app/controllers/admin/auth/adminAuthController')


authUser = async (username, password, done) => {
    console.log(`Value of "User" in authUser function ----> ${username}`)         //passport will populate, user = req.body.username
    console.log(`Value of "Password" in authUser function ----> ${password}`) //passport will popuplate, password = req.body.password

    // Use the "user" and "password" to search the DB and match user/password to authenticate the user
    // 1. If the user not found, done (null, false)
    // 2. If the password does not match, done (null, false)
    // 3. If user found and password match, done (null, user)


    try {
        // Find the user with the given username
        const user = await User.findOne({ email: username });

        // If no user is found, return an error
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        // If the password is incorrect, return an error
        if (!await user.isValidPassword(password)) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }

        // If the user and password are both correct, return the user
        return done(null, user);
    } catch (err) {
        // Handle any errors
        console.error(err);

        return done(err);
    }
}

passport.use(new LocalStrategy(authUser))

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.email });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


/* GET users listing. */
router.get("/login", getLoginPage);

router.post("/login", passport.authenticate('local', {
    successReturnToOrRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureMessage: true
}))

router.post('/logout', logout);


module.exports = router;
