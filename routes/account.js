var express = require('express');
var router = express.Router();
var controller = require('../controllers/account');

/* GET users listing. */

router.post('/check-balance', controller.Check_balance);
router.put('/deposit',controller.Deposit);
router.put('/withdraw',controller.Withdraw);
router.put('/change-pin',controller.Change_pin);

module.exports = router;
 