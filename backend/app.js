const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/JwtValidator');
const ConnectDb = require('./Models/db');

require('dotenv').config();
require('./Models/db');
ConnectDb()
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});



// to be able to use react "build" 
app.use(express.static(path.join(__dirname, '../best-frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../best-frontend/dist', 'index.html'));
});


app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})