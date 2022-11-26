import express from 'express';
import passport from 'passport';
import { UserModel } from '../../database/allModules';
import { SignupValidation, SigninValidation } from '../../validation/auth.validation'

const Router = express.Router();

Router.post("/signup", async (req, res) => {

    try {
        await SignupValidation(req.body.credentials);
        await UserModel.findByEmailAndPhone(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);
        const tokens = newUser.generateJsonWebTokens();
        return res.status(200).json({ tokens, status: "success" })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

})

Router.post("/signin", async (req, res) => {

    try {
        await SigninValidation(req.body.credentials);
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const tokens = user.generateJsonWebTokens();
        return res.status(200).json({ tokens, status: "success" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

})

Router.get('/google', passport.authenticate('google', {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ]
}))

Router.get('/google/callback', passport.authenticate('google', { failureRedirect: "/" }), (req, res) => {
    // return res.status(200).json({
    //     token: req.session.passport.user.token,
    // });

    return res.redirect(
        `http://localhost:3000/google/${req.session.passport.user.token}`
    );
})

export default Router;