const express = require('express');
const router = express.Router();

const dashboardRoutes = require('./dashboardRoutes');
const indexRoutes = require('./indexRoutes');
const loginRoutes = require('./loginRoutes');
const logoutRoutes = require('./logoutRoutes');
const registerRoutes = require('./registerRoutes');
const userDataFormRoutes = require('./userDataFormRoutes');

router.use('/', indexRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/register', registerRoutes);
router.use('/userForm', userDataFormRoutes);

module.exports = router;