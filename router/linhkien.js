var express = require('express');
var router = express.Router();
var controlle = require('../controller/linhkien');

module.exports = router;

router.get('/linhkien', controlle.getAllLinhKien);
router.get('/linhkien/add', controlle.getAddLinhKien);
router.get("/linhkien/delete/:id",controlle.delete)
router.post('/linhkien/add', controlle.createLinhKien);