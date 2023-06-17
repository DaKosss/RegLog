require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectToMongoDB = require('./database/connection');
const port = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const path = require('path');
const routes = require('./routes/routes');

// const startServer = require('./serverStart');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/css', express.static(__dirname + '/public/css'));
app.use(express.urlencoded({ extended: true }));

// app.use('/css', express.static(__dirname + '/puplic/css'));

app.use('/img/avatars', express.static(__dirname + '/public/img/avatars'));

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
}));

function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

app.use('/', routes);

async function start() {
    const uri = await connectToMongoDB();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(port, () => {
        console.log('Сервер запущен на порту ' + port);
    });
};

start();