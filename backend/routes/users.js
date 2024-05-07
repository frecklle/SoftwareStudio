const express = require("express")
const bcrypt = require('bcrypt');

const router = express.Router()
router.use(express.json());
router.use(express.urlencoded());



module.exports = router