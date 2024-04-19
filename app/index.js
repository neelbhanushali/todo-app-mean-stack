const router = require("express").Router();

router.use('/users', require('./users/users.controller'))

module.exports = router
