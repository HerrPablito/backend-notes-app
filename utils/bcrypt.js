const bcrypt = require('bcryptjs')


// KRYPTERA LÖSENORDET
async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}

//KONTROLLERA KRYPTERAT LÖSEN: 
async function comparePassword(password, hashedPassword) {
 
	const isEqual = await bcrypt.compare(password, hashedPassword);
    
    if (isEqual) {
         return isEqual;
    }
   
}


module.exports = { comparePassword, hashPassword }

