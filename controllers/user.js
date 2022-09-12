const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const Role = require('../models/role');
const { capitalize } = require("../helpers/capitalizeStr");

const createUser = async(req, res = response) => {
    // try {
        const name = capitalize(req.body.name);
        const email = req.body.email.toLowerCase();
        const {role} = req.body;
        const password = req.body.password;
    
        if(role){
            // role = req.body.role.toLowerCase();
            role.toLowerCase();
            const rol = await Role.findOne({role});
    
            if ( !rol ) {
                role = 'usuario_role'
            }
        }
    
        if(name == '' || email == '' || password == ''){
            res.status(404).json({
                msg:'Uno de los datos esta basio'
            })

        }
    
        const user = new User({name,email,role,password})
    
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password,salt);
    
        await user.save()
    
        const userAuth = req.userAuth;
    
        res.json({
            user,
            userAuth
        });
    // } catch (error) {
    //     res.status(404).json('Ocurrio un error') 
    // }
}

const getUser = async (req, res) => {
    const users = await User.find()


    res.json({
        users
    });
}

const updateUser = async (req, res) => {

    try {
        const  {id} = req.params;
        let {name, email, role, password} = req.body;

        if(email){
            const user = await User.findOne({email: email});
            if(user){
                return res.status(400).json({
                    msg: 'The email is already registered'
                });
            }
        }

        if(role){
            role = req.body.role.toLowerCase();

            const rol = await Role.findOne({role});

            if ( !rol ) {
                return res.status(400).json({
                    msg: 'Invalid Role'
                });
            }
        }

        if(password){
            if(password.length > 6){
                return res.status(400).json({
                    msg: 'The password must contain at least 6 digits'
                });
            }

            const salt = bcryptjs.genSaltSync();
            password = bcryptjs.hashSync(password,salt);
        }

        const user = await User.findByIdAndUpdate(id,{name, email, role, password},{new:true});

        res.json({
            user
        });
        
    } catch (error) {
        res.status(404).json({
            msg:"No se pudo hacer la actualizacion"
        })
    }

    
}

const deleteUser = async(req, res)=>{
    const {id} = req.params;

    const user = await User.findByIdAndDelete(id);

    res.json({
        user
    });
}

const getMeseros = async(req, res = response)=>{
    const operator = await User.find({role: "mesero_role"}).exec((err, result)=>{
        if(err || result.length == 0){
            res.status(404).json({
                msg:"No hay meseros"
            })
        }else{
            res.json(result)
        }
    })
    
}

module.exports = {
    createUser,
    getUser,
    getMeseros,
    updateUser,
    deleteUser
}