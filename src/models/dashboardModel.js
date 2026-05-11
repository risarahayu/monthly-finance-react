const db = require('../config/db');

async function getDashboardSummary(month, year){
    let sql = `SELECT 
                   SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
                   SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
                FROM transactions`;
    
    // params to hold values for fill '?'
    let params = [];
    // Tambah filter jika month atau year diberikan
    if (month || year) {
        let whereConditions = [];

        
        if (month) {
            whereConditions.push('MONTH(trans_date) = ?');
            params.push(month);
        }
        if (year) {
            whereConditions.push('YEAR(trans_date) = ?');
            params.push(year);
        }
        
        if (whereConditions.length > 0) {
            sql += ' WHERE ' + whereConditions.join(' AND ');
            
        }
    }
    // get just the row | db.execute(sql, params) will return an array of rows, we want the first row which contains total_income and total_expense
    const [result] = await db.execute(sql, params);
    // although the sql is just return 1 row [{}], but the result is still an array of 1 row, so we need to return result[0] to get the first row of the result set, which contains total_income and total_expense

    // return result[0] to get the first row of the result set, which contains total_income and total_expense | {} not [{}]
    return result[0];
    
}


async function getDashboardCategorySummaryExpense(month, year) {
    console.log(">>> FUNGSI DIPANGGIL dengan:", { month, year }); // TAMBAHKAN INI
    let sql = `SELECT category, SUM(amount) AS total
    FROM transactions
    WHERE type = 'expense'`;
    
    let params = [];
    
    if (month || year) {
        let whereConditions = [];
        
        if (month) {
            whereConditions.push('MONTH(trans_date) = ?');
            params.push(month);
        }
        if (year) {
            whereConditions.push('YEAR(trans_date) = ?');
            params.push(year);
        }
        
        if (whereConditions.length > 0) {
            
            sql += ' AND ' + whereConditions.join(' AND ');
        }
    }
    sql += ' GROUP BY category';

    console.log('SQL:', sql);
    console.log('Params:', params);

    const [result] = await db.execute(sql, params);


    console.log('getDashboardCategorySummary result:', result);
    return result;
}


// async function getFilteredTransactions(month, year) {
//     const sql = `SELECT * FROM transactions WHERE MONTH(trans_date) = ? AND YEAR(trans_date) = ?`;
//     const [result] = await db.execute(sql, [month, year]);
//     return result;
// }

module.exports = {
    getDashboardSummary,
    getDashboardCategorySummaryExpense
};