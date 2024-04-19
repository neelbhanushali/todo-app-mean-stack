const router = require("express").Router();
const expressValidator = require('express-validator')
const respond = require('../../responder')
const todoService = require('./todo.service')

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateTodo:
 *      type: object
 *      properties:
 *        title: 
 *          type: string
 *          description: Todo Title
 *        description: 
 *          type: string
 *          description: Todo Description
 *        user: 
 *          type: string
 *          description: Object Id of the user creating the todo
 *      example:
 *        title: Title
 *        description: 
 *        user: 
 */
const createTodoValidator = [
  expressValidator.body('title', 'Title is required').not().isEmpty(),
  expressValidator.body('user', 'User id is required').not().isEmpty(),
]

/**
 * @swagger
 * /api/todo:
 *  post:
 *    summary: Create Todo
 *    tags: [Todo]
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateTodo'
 *    responses:
 *      200: 
 *        description: Todo Created
 *      422:
 *        description: Validation error
 */
router.post('/', createTodoValidator, async (req, res) => {
  const errors = expressValidator.validationResult(req)
  if(!errors.isEmpty()) {
    return respond.withValidationError(res, error=errors.array({onlyFirstError: true}))
  }

  const out = await todoService.createTodo(req.body)
  
  return respond.withSuccess(res, out)
})

module.exports = router