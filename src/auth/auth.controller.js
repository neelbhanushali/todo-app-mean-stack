const router = require("express").Router();
const expressValidator = require('express-validator')
const userService = require('./auth.service')
const UserModel = require('../models/user')
const respond = require('../../responder')

/**
 * @swagger
 * components:
 *  schemas:
 *    RegisterUser:
 *      type: object
 *      properties:
 *        first_name: 
 *          type: string
 *          description: First name of the user
 *        email: 
 *          type: string
 *          description: Email of the user
 *        password: 
 *          type: string
 *          description: Password of the user
 *      example:
 *        first_name: John
 *        email: john.doe@example.com
 *        password: John@123
 */
const registerValidator = [
  expressValidator.body('first_name', 'First name is required').not().isEmpty(),
  expressValidator.body('email', 'Email is required').not().isEmpty(),
  expressValidator.body('email', 'Provide valid email').isEmail(),
  expressValidator.body('password', 'Password is required').not().isEmpty(),
  expressValidator.body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
  expressValidator.check('email').custom(value => {
    return UserModel.findOne({email: value}).then(user => {
      if(user) {
        return Promise.reject('Email already in use')
      }
    })
  })
]

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Register a user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RegisterUser'
 *    responses:
 *      200: 
 *        description: Registered user
 */
router.post('/register', registerValidator, async (req, res) => {
    const errors = expressValidator.validationResult(req)
    if(!errors.isEmpty()) {
      return respond.withValidationError(res, error=errors.array({onlyFirstError: true}))
    }
    
    await userService.registerUser(req.body)

    return respond.withSuccess(res, data=[], msg='Registration done')
})

router.get('/login', (req, res) => {
    res.send('login done')
})

module.exports = router;
