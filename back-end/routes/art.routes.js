const router = require('express').Router()

const isArtist = require('../middlewares/isArtist')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Art = require('./../models/Art.model')


// All routes prefixed by '/api/artPiece

// GET Art 
//ROUTE NOT PROTECTED

router.get('/', async (req, res, next) => {
    const query = {
        description: req.query.description,
        title: req.query.title,
        date: req.query.date,
        artist: req.query.artist,
    }
    if (!query.description) {
        delete query.description
    }
    if (!query.title) {
        delete query.title
    }
    if (!query.date) {
        delete query.date
    }
    if (!query.artist) {
        delete query.artist
    }
    try {
        const artPieces = await Art.find(query)
        res.json(artPieces)
    } catch (error) {
        next(error)
    }
})

// GET one art piece  
//ROUTE NOT PROTECTED


router.get('/:id', async (req, res, next) => {
    try {
        const oneArtPiece = await Art.findById(req.params.id)
        res.json(oneArtPiece)
    } catch (error) {
        next(error)
    }
})



router.use(isAuthenticated)
router.use(isArtist)



// Create one art piece
//ROUTE PROTECTED isArtist = true



router.post('/', async (req, res, next) => {
    try {
        const { art, description, title, date } = req.body
        const createdArt = await Art.create({ art, description, title, date, artist: req.user._id })
        res.status(201).json(createdArt)
    } catch (error) {
        next(error)
    }
})

// Update an art piece

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { art, description, title, date } = req.body

        const updatedArt = await Art.findOneAndUpdate(
            { _id: id, artist: req.user._id },
            { art, description, title, date },
            { new: true }
        )
        res.status(202).json(updatedArt)
    } catch (error) {
        next(error)
    }
})

// delete art piece

router.delete('/:id', async (req, res, next) => {
    try {
        await Art.findOneAndDelete({ _id: id, artist: req.user._id })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = router;