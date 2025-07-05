const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        if (error.code === 11000){
            return res.status(400).json({message:'Erro: O SKU já está em uso', details: error.message});
        }
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({message: 'Erro de validação', errors});
        }
        res.status(500).json({message: 'Erro interno do servidor', details: error.message});
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Busca todos os produtos
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor ao buscar produtos', error: error.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: 'ID inválido'});
        }
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({message: 'Produto não encontrado'});
        } 
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: 'Erro interno do servidor', details: error.message});
    }
} 

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!updatedProduct) {
            return res.status(404).json({message: 'Produto não encontrado'});
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        if(error.code === 11000) {
            return res.status(400).json({message: 'Erro: O SKU já está em uso', details: error.message});
        }
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({message: 'Erro de validação', errors});
        }
        res.status(500).json({message: 'Erro interno do servidor', details: error.message});
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: 'ID inválido'});
        }
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({message: 'Produto não encontrado'});
        }
        res.status(200).json({message: 'Produto deletado com sucesso'});
    } catch (error) {
        res.status(500).json({message: 'Erro interno do servidor', details: error.message});
    }
}