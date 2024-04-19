const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

async function registerUser(user) {
  const userObj = new UserModel.model({
    first_name: user.first_name,
    email: user.email,
    password: bcrypt.hashSync(user.password, 7)
  })
  
  return await userObj.save()
}

module.exports = { registerUser }
