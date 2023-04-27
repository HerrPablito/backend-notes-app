
const jwt = require('jsonwebtoken');

async function auth(request, response, next) {
    const token = request.headers.authorization.replace('Bearer ', '')
    try {
        const data = jwt.verify(token, 'Nelson123');
        request.token = token;
        request.id = data.userId;
        next()
    } catch (error) {
        response.json({
            success: false,
            error: "Invalid token"
        })
    }
}



module.exports = { auth }