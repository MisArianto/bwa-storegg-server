var express = require('express');
var router = express.Router();
const {index, create, store, edit, update, destroy, updateStatus} = require('./controller')
const multer = require('multer')
const os = require('os')

const { isLoginAdmin } = require('../middleware/auth')

/* GET home page. */
router.use(isLoginAdmin)
router.get('/', index);
router.get('/create' , create);
router.post('/store', multer({dest: os.tmpdir()}).single('image') , store);
router.get('/edit/:id', edit);
router.put('/update/:id', update);
router.delete('/destroy/:id', destroy);
router.put('/status/:id', updateStatus);

module.exports = router;
