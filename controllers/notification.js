const { response } = require("express");
const {config} = require("../database/config")


const createSMS = async (req, res=response)=>{
    const accountSid = 'AC35010b03dcfea74efa8b3648ec8db63d'; 
    const authToken = 'd577f3398591c3362362f4cd8365db1e'; 
    const client = require('twilio')(accountSid, authToken); 
    
    client.messages 
        .create({         
            from:"+18154860197",
            to: "+573213896864",
            body:"Hola mundo"
        }) 
        .then(message => res.json(message.sid)) 
        .done();
}

module.exports = {
    createSMS
}