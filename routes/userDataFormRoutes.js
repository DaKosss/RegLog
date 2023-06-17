const express = require('express');
const router = express.Router();
// const UserDetails = require('../models/UserDetails');

router.get('/', (req, res) => {
    res.render('userDataForm', { session: req.session });
});

module.exports = router;