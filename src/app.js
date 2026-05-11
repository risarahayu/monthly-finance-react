// mengambil / mengimpor package Express dari node_modules
const express = require('express');

const transactionRoutes = require('./routes/transactionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// create server 
const app = express();

/* middleware*/
// parsing (read) json body from request -> save in req.body -> then can be used in routes then controller
app.use(express.json());

/* folder public */ 
// read file manualy
app.use(express.static('public'));

/* routes */
app.use('/transactions', transactionRoutes);
app.use('/dashboard', dashboardRoutes);
    
module.exports = app;