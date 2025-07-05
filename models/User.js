const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'O nome é obrigatório'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, insira um email válido']
    },
    age: {
        type: Number,
        required: [true, 'A idade é obrigatória'],
        min: [0, 'A idade não pode ser negativa']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);