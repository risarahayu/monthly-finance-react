const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require('../controllers/dashboardController');


router.get('/api', controller.getDashboardSummary);
router.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

router.get('/api/category-summary', controller.getExpenseByCategory);

module.exports = router;