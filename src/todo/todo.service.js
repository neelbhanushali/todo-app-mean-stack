const TodoModel = require('../models/todo')

async function createTodo(todo) {
  const obj = new TodoModel.model({
    title: todo.title,
    user: todo.user
  })
  await obj.save()

  return await TodoModel.model.findOne()
}

module.exports = { createTodo }