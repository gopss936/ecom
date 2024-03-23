const Category=require('../models/category');
const Product=require('../models/product');
exports.createCategory = async (req,res)=>{
    try{
        const {name}=req.body;
        const isCategoryExist =await Category.findOne({name:name});
        if(isCategoryExist){
            res.status(403).json({message:'Category already exists'});
        }
        const category=new Category({name});
        await category.save();
        res.status(201).json({message:'Category Created Successfully'});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.updateCategory = async (req,res)=>{
    try{
        const {categoryId}=req.query;
        const {name}=req.body;
        const updateCategory =await Category.findByIdAndUpdate(categoryId, {name:name});
        if(!updateCategory){
            res.status(404).json({message:'Category not found'});
        }
        res.status(200).json({message:'Category Updated Successfully',updateCategory});
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

exports.getAllCategory = async (req,res)=>{
try{
    const allCategory=await Category.find();
    if(!allCategory){
        res.status(404).json({message:'categories not found'})
    }
    res.status(200).json(allCategory)
}catch(err){
    res.status(400).json({message:err.message});
}
}

exports.getCategoryWiseProducts = async (req,res)=>{
    try{
        const categoryId=req.query.categoryId;
        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(404).json({error:"Category not found"})
        }
        const products = await Product.find({ categoryId:categoryId});

        res.status(200).json({products:products});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}