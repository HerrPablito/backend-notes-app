const { saveUser, findUserInDb } = require("../model/user.model");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const jwt = require('jsonwebtoken');

// SKAPA KONTO
async function signUpCtrl(request, response) {
    //här tar vi in data som matas in.
    const { email, username, password } = request.body;
    // krypterar det angedda lösenordet
    const hashedPass = await hashPassword(password)
    
    saveUser(username, hashedPass, email)

    //detta är infon som skickas tillbaka till nya användaren
    result ={
        success: true,
        message: "new user added"
        }
    response.status(200).json(result)

}

// LOGGA IN
async function loginCtrl(request, response) {
    //Här tar vi emot vilka uppgifter som behövs för att logga in.
    const { username, password } = request.body;
    //Här kontrollerar vi att username finns i databasen
    const findUserResult = await findUserInDb(username)

    if (!findUserResult.success) {
        return response.json(findUserResult);
    }

    const user = findUserResult.user;
    
    //Här kontrollerar vi att password finns i databasen
    const correctPassword = await comparePassword(password, user.password);
    //Om lösen inte är korrekt blir det false
    result = {
        success: false
    }
    //Om uppgifterna stämmer, så får användaren en Token
    if (correctPassword) {
        //Här krypterar vi användarens Token och kopplar detta till användarens userId
        const token = jwt.sign({ userId: user.userId }, 'Nelson123', {
            //Hur länga är Token giltlig?
            expiresIn: 600 //antal sekunder
        })
        result.success = true;
        result.token = token;        
    }else{
        result.message='Wrong Token or login'
    }
    response.status(200).json(result)
}

module.exports = { signUpCtrl, loginCtrl}


