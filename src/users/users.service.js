const UserModel = require('./users.model')
const bcrypt = require('bcrypt')

async function registerUser(user) {
  console.log(user, 'user body')

  const userObj = new UserModel({
    first_name: user.first_name,
    email: user.email,
    password: bcrypt.hashSync(user.password, 7)
  })
  await userObj.save()
}

module.exports = { registerUser }
