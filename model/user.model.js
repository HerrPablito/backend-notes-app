const { response } = require('express')
const nedb = require('nedb-promises')
const userDb = new nedb({ filename: 'userDb.db', autoload: true })
const uuid =require('uuid-random')


//Spara användare i databasen userDb
async function saveUser(username, hashedPass, email){
    
    const userNameExist = await userDb.findOne({ username: username })
    const emailExist = await userDb.findOne({ email })

    if (userNameExist) {
        throw new Error('Username already exist.')
    } else if (emailExist) {
        throw new Error('Email already exist.')
    } else {
        
    const userData = {
        username: username,
        password: hashedPass,
        email: email,
        userId: uuid()
        }
// Här sparas datan i databasen
        await userDb.insert(userData)
        
    }


}

//logga in 
async function findUserById(id){
    console.log(id);
    return await userDb.findOne({ userId: id})


}

async function findUserInDb(username){
    
    const userExist = await userDb.findOne({ username })
    if (userExist) {
        
            return { success: true, user: userExist };
        } else {
            return { success: false, message: "No user by that name" };
        }
}
    

module.exports = {saveUser, findUserInDb, findUserById}