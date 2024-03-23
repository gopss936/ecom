const mongoose= require('mongoose');

const storeSchema=new mongoose.Schema({
    name:String,
    location:String,
    categories:[{type:mongoose.Schema.Types.ObjectId,ref:'Category'}],
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}

})

module.exports=mongoose.model('Store',storeSchema);