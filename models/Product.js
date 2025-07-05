const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O nome do produto é obrigatório'],
        trim: true,
    },
    sku: {
        type: String,
        required: [true, 'O SKU do produto é obrigatório'],
        unique: true,
        trim: true,
        oppercase: true,
    },
    price: {
        type: Number,
        required: [true, 'O preço do produto é obrigatório'],
        min: [0, 'O preço não pode ser negativo']
    },
    category: {
        type: String,
        required: [true, 'A categoria do produto é obrigatória'],
        trim: true,
        default: 'Geral'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', ProductSchema);