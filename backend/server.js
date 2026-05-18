require('dotenv').config();

const app = require('./app');
const db = require('./config/db');

// optional: test koneksi database
async function testDB() {
    try {
        await db.query('SELECT 1');
        console.log('MySQL Connected Successfully');
    } catch (err) {
        console.error('Database connection failed:', err.message);
    }
}

testDB();

// run the server 
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});