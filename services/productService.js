const Product = require('../models/product')
const Order = require('../models/orders');

exports.createProduct = async (req,res)=>{
    try{
        const {name,quantity,size,price,categoryId} = req.body;
        const newProduct = new Product({name,quantity,size,price,categoryId:categoryId});
        const saveProduct=await newProduct.save();
        res.status(201).json(saveProduct);
    }catch(error){
        res.status(500).json({error:'Error creating product'})
    }
}

exports.updateProduct = async (req,res)=>{
 try{
    const productId=req.query.ProductId;
    const {name,quantity,size} = req.body;
    const updateProduct=await Product.findByIdAndUpdate(productId,{name,quantity,size});
    if(!updateProduct){
        res.status(404).json({error:'Product not found'})
    }
    res.status(200).json(updateProduct);
 }catch{
    res.status(500).json({error:'Error updating Product'})
 }
}
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.find({ category: categoryId });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.placeOrder = async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        const orderItems = [];
        let totalPrice = 0;

        for (const productInfo of products) {
            const { productId, quantity ,stock} = productInfo;
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found` });
            }
            if (quantity > product.stock) {
                return res.status(400).json({ message: `Insufficient stock for product ${productId}` });
            }

            const totalCost = product.price * quantity;

            product.quantity -= quantity;
            await product.save();
            orderItems.push({
                productId: productId,
                productName: product.name,
                quantity: quantity,
                price: product.price,
                stock:stock,
                totalCost: totalCost,
                categoryId: product.categoryId,

            });

            totalPrice += totalCost;
        }

        const order = new Order({
            products: orderItems,
            totalPrice: totalPrice
        });
        await order.save();
 
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getOrderById = async (req, res) => {
    try {
        const orderId=req.query.orderId
        const orders = await Order.findOne({_id:orderId});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
