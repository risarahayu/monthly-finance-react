const express = require('express');
const router = express.Router();

const controller = require('../controllers/transactionController');

router.get('/', controller.getTransactions);
router.get('/:id', controller.getTransactionById);
router.post('/', controller.addTransaction);
router.put('/:id', controller.updateTransaction);
router.delete('/:id', controller.deleteTransaction);



module.exports = router;