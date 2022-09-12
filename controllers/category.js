const { response } = require("express");

const Category = require("../models/category");

const createCategory = async(req, res = response) => {
    try {
        const {name,description} = req.body;

        const category = new Category({name, description});
    
        await category.save();
    
        res.json({
            category
        }) 
    } catch (error) {
        res.status(404).json({message: "No se pudo agregar una categoria"});
    }
    
}

const getCategory = async(req, res = response) => {
    const category = await Category.find();

    res.json({
        category
    })
}

const getCategoryId = async(req, res = response) => {
    const {id} = req.params;

    if(id ){
        let ids = Category.findById(id);
        if(!ids || id == null){
            res.status(404).json({
                msg: 'No se encontro esa Categoria'
            })
        }
    }

    const categoryId = await Category.findById(id);
    if(!categoryId){
        return res.status(404).json({message: "No se encontro ningun Categoria"})
    }
    res.json(categoryId);
}

const updateCategory = async(req, res = response) => { 
    const {id} = req.params;
    const {name,description} = req.body;

    if(id ){
        let ids = Category.findById(id);
        if(!ids || id == null){
            res.status(404).json({
                msg: 'No se encontro esa Categoria' 
            })
        }
    }


    try {
        const categorys = await Category.findByIdAndUpdate(id,{name,description},{new:true});

        res.json(categorys)
    } catch (error) {
        res.status(404).json(
            {
                message:"No se pudo actualizar la categoria"
            }
        )
    }
}

const deleteCategory = async(req, res = response) => {

    try {
        const {id} = req.params;

        const category = await Category.findByIdAndRemove(id);

        res.json({
            category
        });
    } catch (error) {
        res.status(404).json(
            {
                message:"No se pudo elininar esta categoria"
            }
        )
    }
    
}

module.exports={
    createCategory,
    getCategory,
    getCategoryId,
    updateCategory,
    deleteCategory
}