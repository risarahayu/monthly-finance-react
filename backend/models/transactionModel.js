const db = require('../config/db');

// Get all transactions without filter
async function getAllTransactions() {
    const [rows] = await db.execute('SELECT * FROM transactions');
    return rows;
}

// Get filtered transactions based on date range and type
async function getFilteredTransactions(startDate, endDate, type) {
    let sql = 'SELECT * FROM transactions WHERE 1=1'; // Start with always true condition
    const params = [];

    if (startDate) {
        sql += ' AND trans_date >= ?';
        params.push(startDate);
    }

    if (endDate) {
        sql += ' AND trans_date <= ?';
        params.push(endDate);
    }

    if (type) {
        sql += ' AND type = ?';
        params.push(type);
    }

    sql += ' ORDER BY trans_date DESC';

    const [rows] = await db.execute(sql, params);
    return rows;
}

// Add new transaction to database
// Parameter 'data' contains: {trans_date, description, category, type, amount from HTML form inputs}
async function addTransaction(data) {
    const sql = `
        INSERT INTO transactions
        (trans_date, description, category, type, amount)
        VALUES (?, ?, ?, ?, ?)
    `;

    // Using prepared statements for security (prevent SQL injection)
    // Array values come directly from HTML form inputs
    // await db.query(sql, values);
    const [result] = await db.query(sql, [
        data.trans_date,    // Date from <input type="date">
        data.description,   // Text from <input id="description">
        data.category,      // Text from <input id="category">
        data.type,          // Value from <select id="typeInput">
        data.amount         // Number from <input type="number">
    ]);
    return result;
}

// Update existing transaction by ID
async function updateTransaction(id, data) {
    const sql = `
        UPDATE transactions
        SET trans_date = ?, description = ?, category = ?, type = ?, amount = ?
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [
        data.trans_date,
        data.description,
        data.category,
        data.type,
        data.amount,
        id  // Transaction ID to update
    ]);
    return result;
}

// Delete transaction by ID
async function deleteTransaction(id) {
    const sql = 'DELETE FROM transactions WHERE id = ?';
    const [result] = await db.query(sql, [id]);
    return result;
}

// Get single transaction by ID (used for editing)
async function getTransactionById(id) {
    const sql = 'SELECT * FROM transactions WHERE id=?';
    const [result] = await db.execute(sql, [id]);
    return result;
}

module.exports = {
    getAllTransactions,
    getFilteredTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionById
};