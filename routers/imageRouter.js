const express = require("express")
const {uploadImage, getImage} = require('../controllers/imageController')
const router = express.Router()

router.post('/', uploadImage)

router.get('/:id', getImage)


module.exports = router
