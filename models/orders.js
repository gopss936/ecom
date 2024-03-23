const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',  
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        totalCost: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
