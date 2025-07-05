require ('dotenv').config();
const express = require('express');
const connectDB  = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { connect } = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()

app.use(express.json())

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('API está funcionando!');
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`acesse: http://localhost:${PORT}`);    
})