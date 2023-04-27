const { response } = require('express')
const nedb = require('nedb-promises')
const userDb = new nedb({ filename: 'userDb.db', autoload: true })
const uuid = require('uuid-random')

async function saveUser(username, hashedPass, email) {
    const userData = {
        username: username,
        password: hashedPass,
        email: email,
        userId: uuid()
    }

    await userDb.insert(userData)
    return userData;
}

async function findUserByName(username) {
    const user = await userDb.findOne({ username: username })
    const userId = user.userId;
    return userId
}

async function findUserById(id) {
    return await userDb.findOne({ userId: id })
}

async function findUserInDb(username) {
    const userExist = await userDb.findOne({ username })
    if (userExist) {
        return { success: true, user: userExist };
    } else {
        return { success: false, message: "No user by that name" };
    }
}

module.exports = { saveUser, findUserInDb, findUserById, findUserByName }