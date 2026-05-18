const Transaction = require('../models/transactionModel');
const db = require('../config/db');

async function getTransactions(req, res) {
    try {
        const { startDate, endDate, type } = req.query;
        
        let results;
        if (startDate || endDate || type) {
            results = await Transaction.getFilteredTransactions(startDate, endDate, type);      
        } else {
            results = await Transaction.getAllTransactions();
        }
        
        res.json(results);
    } catch (err) {
        console.error('Error in getTransactions:', err);
        res.status(500).json({ error: err.message });
    }
}


async function addTransaction(req, res) {
    try {
        const result = await Transaction.addTransaction(req.body);
        res.send('Transaction added successfully');
    } catch (err) {
        res.status(500).send('Failed to add transaction');
    }
}

async function updateTransaction(req, res) {
    try {
        const id = req.params.id;
        const result = await Transaction.updateTransaction(id, req.body);
        res.send('Transaction updated successfully');
    } catch (err) {
        res.status(500).send('Failed to update transaction');
    }
}

async function deleteTransaction(req, res) {
    try {
        const id = req.params.id;
        await Transaction.deleteTransaction(id);
        res.send('Transaction deleted successfully');
    } catch (error) {
        res.status(500).send('Failed to delete transaction');
    }
}

async function getTransactionById(req, res) {
    try {        
        const id = req.params.id;
        const result = await Transaction.getTransactionById(id);
        res.json(result[0]);
    } catch (err) {
        res.status(500).send('Failed to fetch transaction');
    }
}

module.exports = {
    getTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction
};