const { response } = require("express");
const fs = require("fs");
const  Platos = require('../models/platos');
const  Category = require('../models/category');
const { subirArchivo } = require("../helpers");
const path = require("path");
const {config} = require("../database/config");
const console = require("console");


//Falta guardar imagen en un documento
const createPlato = async (req, res=response)=>{

    try {
        let list = [];
        let list1 = [];
        const {name,description,alerts,prices,archivo,state,category} = req.body;
        // console.log(archivo)
        // console.log(req.files)
        
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            return res.status(400).json({msg:'No files were uploaded'});  
        }
        
        // console.log(req.files);
        // console.log(archivo)

        if(category){
            const categorias = await Category.findOne({"name": category})
            if(!categorias){
                return res.status(404).json({msg:'No category was found'});
            }
        }

        if(req.files.archivo.length !== undefined){
            for(let i = 0; i < req.files.archivo.length; i++) {
                let buscar = req.files.archivo[i];
                // console.log(buscar);
                const pathCompleto = await subirArchivo(buscar,undefined,'platos');
                const url = `${config.host}:${config.port}/api/platos/platos/${pathCompleto}`
                list.push(pathCompleto);
                list1.push(url);
            }
        }else{
            let buscar = req.files.archivo;
            const pathCompleto = await subirArchivo(buscar,undefined,'platos');
            const url = `${config.host}:${config.port}/api/platos/platos/${pathCompleto}`
            list.push(pathCompleto);
            list1.push(url);
        }

        // console.log(list);

        const plato =  new Platos({name,description,alerts,prices,archivo:list,url:list1,state,category});
    
        // if(req.file){
        //     const {filename} = req.file
        //     plato.setImgUrl(filename);   
        // }
        
        await plato.save();
    
        const platos = await Platos.findById(plato.id)
                                    .populate({
                                        path:'category',
                                        select: '_id name',
                                    })
    
        

        res.json(platos);

        
    }catch(error) {
        res.status(404).json("No se pudo agregar el plato")
    }
    
}

const getPlatos = async (req, res=response) =>{
    const [total,platos] = await Promise.all([
        Platos.count(),
        Platos.find()
                .populate({
                    path:'category',
                    select: '_id name',
                })
    ]);

    res.json({total,platos});
}

const getPlatosID = async (req, res=response) => {
    const {id} = req.params;

    if(id){
        let ids = Platos.findById(id)
        
        if(!ids || id == null){
            res.status(404).json({
                msg: 'No se encontro ese ID de platos'
            })
        }
    }

    let  platos = await Platos.findById(id)
                        .populate({
                            path:'category',
                            select: 'name',
                        })

    res.json(platos);
}

const getPlatosCategory = async (req, res= response) =>{
    const {name} = req.params;


    if(name){
        let ids = Category.find({"name":name}); 
        if(!ids || name == null){
            res.status(404).json({
                msg: 'No se encontro esa Categoria'
            })
        }
    }

    let categoryplatos = await Platos.find({"category":name});

    if(!categoryplatos || categoryplatos.length == 0){
        return res.status(200).json({msg:"No se encontro ningun plato en esta categoria"})
    }else{
        res.json(categoryplatos);  
    }

}

const getImagenes = async (req, res=response) =>{
    const {name,collection} = req.params;

    let list = [];
    list.push(name)
    let modelo;
   
    switch (collection) {
        case 'platos':
            modelo = await Platos.findOne({"archivo":{$in:[name]}}) 

            if(!modelo){
              return res.status(400).json({
                msg: 'Platos not found'
              })
            }

            break;
    
        default:
            return res.status(500).json({msg:'Se me olvido validar'})
    }

    for(let i = 0; i < modelo.archivo.length; i++){
        if(modelo.archivo[i] == name){
            const pathImagen = path.join(__dirname, '../uploads',collection,modelo.archivo[i]);
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen)
            }
        }
    } 

    res.json({msg: 'Falta el place holder'})
}

const updatePlatosImages = async (req, res=response) => {
    

    const {id,collection} = req.params;
    let url='';

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No files were uploaded'});
    }

    let modelo;
    switch (collection) {
        case 'platos':
            modelo = await Platos.findById(id);  
            if(!modelo){
              return res.status(400).json({
                msg: 'Platos not found'
              })
            }

            break;
    
        default:
            return res.status(500).json({msg:'Se me olvido validar'})
    }

    if(modelo.archivo){
        const pathImagen = path.join(__dirname, '../uploads',collection,modelo.archivo);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }

    const pathCompleto =  await subirArchivo(req.files,undefined,collection);
    modelo.archivo =  pathCompleto;


    await modelo.save();

    res.json({
        modelo
    });
}

const updatePlatos = async (req, res= response) => {
    const {id} = req.params;
    const {name,description,alerts,prices,state,category} = req.body;
    let collection = "";
    if(id){
        let ids = await Platos.findById(id);
        if(!ids || id == null){
            return res.status(404).json({
                msg: 'No se encontro ese ID de platos'
            })
        }
    };

    if(req.files !== null){
        let images = await Platos.findById(id);
        let cadena = images.url;
        let modelo;
        // let cadenaseparada = cadena.split('/');
        for (let i = 0; i < cadena.length; i++) {
            const element = cadena[i];
            collection = element.split('/');
        }
        
        switch (collection[5]) {
            case 'platos':
                modelo = await Platos.findById(id);
                if(!modelo){
                    return res.status(400).json({msg:'Platos not found'});
                }
                break;
        
            default:
                break;
        }
    
        let collection1 =  collection[5];
        if(modelo.archivo){
            const pathImagen = path.join(__dirname, '../uploads',collection1,modelo.archivo[0]);
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }
        }

        const pathCompleto =  await subirArchivo(req.files.archivo,undefined,collection1);
        modelo.archivo =  pathCompleto; 
        url = `${config.host}:${config.port}/api/platos/platos/${pathCompleto}`
        await modelo.save();
    }


    if(url !== ''){
        const platos =  await Platos.findByIdAndUpdate(id,{name,description,alerts,prices,state,category,url},{new:true});
        return res.json(platos);
    }else{
        const platos =  await Platos.findByIdAndUpdate(id,{name,description,alerts,prices,state,category},{new:true});
        return res.json(platos);
    }
}

const deletePlatos = async (req, res=response) => {
    const {id} = req.params;

    if(id ){
        let ids = Platos.findById(id);
        if(!ids || id == null){
            res.status(404).json({
                msg: 'No se encontro ese ID de platos'
            })
        }
    }; 
    
    const eliminar = await Platos.findById(id);
    if(eliminar == null){
       return res.status(404).json({msg: 'No se encontro ese ID de platos'});
    }

   if(eliminar.archivo){
    for (let i = 0; i < eliminar.url.length; i++) {
        const element = eliminar.url[i];
        collection = element.split('/');
    }
    const pathImagen = path.join(__dirname, '../uploads',collection[5],eliminar.archivo[0]);
    if(fs.existsSync(pathImagen)){
        await fs.unlink(pathImagen,function (error) {
            console.log(error);
        });
    }
   }

    const platos = await Platos.findByIdAndDelete(id);

    if(platos == null){
        return res.status(404).json({msg: 'No se encontro ese ID de platos'})
    }else{
        res.json(platos);
    }

}

module.exports = {
    createPlato,
    getPlatos,
    getPlatosID,
    getPlatosCategory,
    getImagenes,
    updatePlatosImages,
    updatePlatos,
    deletePlatos
}