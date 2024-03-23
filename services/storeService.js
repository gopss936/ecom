const Store = require('../models/stores')

exports.createStore = async (req,res)=>{
    try{
        const {storeName,location} = req.body;
        const newStore = new Store({storeName,location});
        const saveStore=await newStore.save();
        res.status(201).json(saveStore);
    }catch(error){
        res.status(500).json({error:'Error creating store'})
    }
}

exports.updateStore = async (req,res)=>{
 try{
    const storeId=req.query.StoreId;
    const {name,location} = req.body;
    const updateStore=await Store.findByIdAndUpdate(storeId,{name,location});
    if(!updateStore){
        res.status(404).json({error:'Store not found'})
    }
    res.status(200).json(updateStore);
 }catch{
    res.status(500).json({error:'Error updating store'})
 }
}

exports.getAllStore = async (req,res)=>{
    try{
        const stores=await Store.find();
        if(!stores){
            res.status(404).json({message:"store not found.try again!"})
        }
        res.status(200).json(stores);
    }catch{
        res.status(500).json({error:'Error while getting store'})
    }
}