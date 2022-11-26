import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport';
import session from 'express-session'
import cors from 'cors';
import helmet from 'helmet';

import privateConfig from './config/route.config';
import googleAuthConfig from './config/google.config'

import ConnectDB from './database/connection.js'
import Order from './api/order';
import User from './api/user';
import Review from './api/review'
import Restaurant from './api/restaurant'
import Menu from './api/menu'
import Food from './api/food'
import Auth from './api/auth'
import Image from './api/image'

dotenv.config();
const port = 4000;
const app = express();

privateConfig(passport);
googleAuthConfig(passport);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(helmet());
app.use(express.json());
app.use(session({ secret: process.env.SECRETORKEY }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is running !"
    })
});

app.use('/user', User);
app.use('/order', Order);
app.use('/review', Review);
app.use('/restaurant', Restaurant);
app.use('/menu', Menu);
app.use('/auth', Auth);
app.use('/food', Food);
app.use('/image', Image);

app.listen(port, () => {
    ConnectDB().then(() => {
        console.log('Server is Running !');
    }).catch((err) => {
        console.log('DataBase connection Failed !!');
        console.log(err);
    });
});

