const Dashboard = require('../models/dashboardModel');
const db = require('../config/db');


async function getDashboardSummary(req, res) {
    try{
        const { month, year } = req.query;
        const result = await Dashboard.getDashboardSummary(month, year);

        const balance = result.total_income - result.total_expense;
        // make new object to send to client
        res.json({
            total_income: result.total_income,
            total_expense: result.total_expense,
            balance: balance
        }
        );
    }
    catch(err) {
        res.status(500).json({ error: err.message });       
    }
}

async function getExpenseByCategory(req, res) {
    try {
        console.log('STEP 1: masuk controller');

        const { month, year } = req.query;

        console.log('STEP 2: sebelum model');

        const result = await Dashboard.getDashboardCategorySummaryExpense(month, year);

        console.log('STEP 3: setelah model', result);

        res.json(result);

        console.log('STEP 4: response dikirim');

    } catch (err) {
        console.error('❌ ERROR CONTROLLER:', err);

        res.status(500).json({
            error: err.message
        });
    }
}




// paraemter fulter already push in dashboard.js, now controller have to catch it and send to model
async function getFilteredTransactions(req, res) {
    try {
        // get from query string
        const { month, year } = req.query;
        // let Model handle the logic to filter data based on month and year
        // save the result to variable and send to client
        const result = await Dashboard.getFilteredTransactions(month, year);
        // send to client
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getDashboardSummary,
    getExpenseByCategory,
    getFilteredTransactions
};
