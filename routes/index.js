const express = require('express')
const router = express.Router()
const homeRouter = require('../controllers/home_controller')

router.get('/' ,homeRouter.home)



module.exports = router