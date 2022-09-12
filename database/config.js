const mongoose = require('mongoose');
 
const config = {
    // appConfig : {
        port :  process.env.PORT,
        host :  process.env.HOST
    // }
}

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_ATLAS );

        console.log('Online database');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error starting database')
        
    }

}

module.exports = {
    dbConnection,
    config
}