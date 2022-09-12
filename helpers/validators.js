const User = require('../models/user');

const validExistEmailByLogin = async(email = '') => {

    const user = await User.findOne({email});

    if ( !user ) {
        throw new Error('Invalid email/password');
    }
}



module.exports = {
    validExistEmailByLogin 
}