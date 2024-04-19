const router = require("express").Router();

router.use('/auth', require('./auth/auth.controller'))

module.exports = router
