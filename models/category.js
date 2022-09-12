const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name:{
        type: String,
        required: [true , 'Name is required']
    },
    description: {
        type: String,
        require: [true, 'Description is required']
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;
    
    return category;
};

module.exports = model( 'Category', CategorySchema );