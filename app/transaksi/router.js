var express = require('express');
var router = express.Router();
const {index, updateStatus} = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

/* GET home page. */
router.use(isLoginAdmin)
router.get('/', index);
router.put('/status/:id', updateStatus);

module.exports = router;
