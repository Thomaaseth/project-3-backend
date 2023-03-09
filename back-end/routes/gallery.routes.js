const router = require('express').Router()
const Art = require('./../models/Art.model')


// GET all art pieces to display in gallery

router.get('/gallery', async (req, res, next) => {
    try {
        const allArt = await Art.find()
        res.json(allArt)
    } catch (error) {
        next(error)
    }
})

// pagination

module.exports = router
