const { header } = require('express/lib/response')
const jwt = require('jsonwebtoken');
const { findUserById } = require('../model/user.model');


async function auth( request, response, next){
    const token = request.headers.authorization.replace('Bearer ', '')
    try{
        const data = jwt.verify(token, 'Nelson123');
 //ta bort denna?
        //       const user = findUserById(data.userId);

        request.token = token; 
        request.id = data.userId;
       
        
        next()

    }catch (error) {
        response.json({
            success: false,
            error: "Invalid token"
            
        })
    }

}



module.exports = { auth }