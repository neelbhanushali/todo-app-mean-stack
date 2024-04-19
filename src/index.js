const router = require("express").Router();

router.use('/auth', require('./auth/auth.controller'))
router.use('/todo', require('./todo/todo.controller'))

module.exports = router
