const { saveUser, findUserInDb } = require("../model/user.model");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const jwt = require('jsonwebtoken');


async function signUpCtrl(request, response) {
    try {
        const { email, username, password } = request.body;
        const hashedPass = await hashPassword(password);
        const userIsSaved = await saveUser(username, hashedPass, email, response);

        if (userIsSaved) {
            response.json({
                success: true,
                message: "new user added"
            });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
}

async function loginCtrl(request, response) {
    try {
        const { username, password } = request.body;
        const findUserResult = await findUserInDb(username)

        if (!findUserResult.success) {
            return response.json(findUserResult);
        }

        const user = findUserResult.user;
        const correctPassword = await comparePassword(password, user.password);

        result = {
            success: false
        }
        if (correctPassword) {
            const token = jwt.sign({ userId: user.userId }, 'Nelson123', {
                expiresIn: 600 //antal sekunder
            })
            result.success = true;
            result.token = token;
        } else {
            result.message = 'Wrong Token or login'
        }
        response.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

}

module.exports = { signUpCtrl, loginCtrl }


