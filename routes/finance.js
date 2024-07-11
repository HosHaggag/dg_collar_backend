const express = require('express');
const router = express.Router();
const financeController = require('../controllers/finance');

// Finance Routes
router.post('/add', financeController.addFinance);
router.get('/:userId', financeController.getFinance);
router.put('/:userId/:financeId', financeController.updateFinance);
router.delete('/:userId/:financeId', financeController.deleteFinance);

module.exports = router;
