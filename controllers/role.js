const { response } = require("express");

const Role = require("../models/role");

const CreateRol = async (req, res=response)=>{
    try {
        const {role} = req.body;

        const roles =  new Role({role});

        await roles.save();
        
        res.json({
            roles
        });

    } catch (error) {
        res.status(404).json({
            msg:"Ya existe este role"
        })
    }

}

const getRol = async (req, res=response)=>{

    try {
        const mesas = await Role.find();

        res.json({
            mesas
        });
    } catch (error) {
      res.status(404).json({
        msg:"No se pudo buscar los roles"
      })  
    }

    
    
}

const updateRol =async (req, res=response)=>{
    const {id} = req.params;

    const {role} =  req.body;
    
    const roles = await Role.findByIdAndUpdate(id,{role},{new:true})

    res.json({
        roles
    })
}

const deleteRol =async (req, res=response)=>{
    const {id} = req.params;

    const roles = await Role.findByIdAndDelete(id);

    res.json({
        roles
    })
}

module.exports ={
    CreateRol,
    getRol,
    updateRol,
    deleteRol
}