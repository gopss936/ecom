const mongoose= require('mongoose');

const productSchema=new mongoose.Schema({
    name:String,
    size:String,
    quantity:String,
    price:String,
    categoryId:String,
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}

})

module.exports=mongoose.model('Product',productSchema);