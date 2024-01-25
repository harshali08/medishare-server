const express=require('express');
const router=express.Router();

const { approveMed } = require('../controllers/admin');

router.post('/approve',approveMed);

module.exports = router;