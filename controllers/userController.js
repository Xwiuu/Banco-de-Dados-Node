const User = require('../models/User');
const mongoose = require('mongoose');

exports.createUser= async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json ({
                message:'Erro: O email já está em uso',
                details: error.message
            })
        } if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json ({message: 'Erro de validação', errors});
        }
        res.status(500).json({message: 'Erro interno do servidor', details: error.message});
    }
}

exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Erro interno do servidor', details: error.message});
    }
}

exports.getUserById = async (req, res) => {
    try {
        // Validação para garantir que o ID é um ObjectId válido do MongoDB
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { // Agora 'mongoose' será definido
            return res.status(400).json({ message: 'ID de usuário inválido.' });
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor ao buscar usuário por ID', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        //{new: true} retorna o documento atualizado
        //{runValidators: true} executa as validações do schema
        // MUDANÇA AQUI: de 'const updateUser' para 'const updatedUser'
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        
        if (!updatedUser){ // <-- AQUI JÁ ESTAVA CERTO
            return res.status(404).json({message: 'Usuário não encontrado'});
        }
        res.status(200).json(updatedUser); // <-- AQUI JÁ ESTAVA CERTO
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message: 'Erro: O email já está em uso', details: error.message});
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

exports.deleteUser = async (req, res) => {
    try {
        if  (!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message: 'ID inválido'});
        }
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) {
            return res.status(404).json({message: 'Usuário não encontrado'});
        }
        res.status(200).json({message: 'Usuário deletado com sucesso'});
    } catch (error) {
        res.status(500).json({message: 'Erro interno do servidor', details: error.message});
    }
}