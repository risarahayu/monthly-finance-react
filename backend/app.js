// import package
const express = require('express');
const cors = require('cors');

const transactionRoutes = require('./routes/transactionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// create app
const app = express();

/* middleware */
app.use(cors());
app.use(express.json());

/* static folder */
app.use(express.static('public'));

/* routes */
app.use('/transactions', transactionRoutes);
app.use('/dashboard', dashboardRoutes);

module.exports = app;