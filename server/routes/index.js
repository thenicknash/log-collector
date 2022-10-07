const express = require('express')

const controllers = require('../controllers')

const router = express.Router()

router.get('/view/file', controllers.viewFile)

module.exports = router