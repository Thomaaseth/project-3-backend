const router = require('express').Router()
const isArtist = require('../middlewares/isArtist')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Art = require('./../models/Art.model')
const fileUpload = require('./../config/cloudinary-config')

// All routes prefixed by '/api/artPiece

// GET request to the root endpoint to retrieve all Art in the database collection
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

// Route to return all art pieces created by the authenticated artist

router.get('/mine', isAuthenticated, isArtist, async (req, res, next) => {
    try {
        const artPieces = await Art.find({ artist: req.user._id })
        res.json(artPieces)
    } catch (error) {
        next(error)
    }
})

// Route to return a specific single art piece

router.get('/:id', async (req, res, next) => {
    try {
        const oneArtPiece = await Art.findById(req.params.id).populate("artist")
        res.json(oneArtPiece)
    } catch (error) {
        next(error)
    }
})



router.use(isAuthenticated)
router.use(isArtist)



// Create one art piece
//ROUTE PROTECTED isArtist = true


router.post('/', fileUpload.single('image'), async (req, res, next) => {
    try {
        const { description, title, date } = req.body
        // return res.json(req.file)
        const imageUrl = req.file.path
        const createdArt = await Art.create({ image: imageUrl, description, title, date, artist: req.user._id })
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

// DELETE art piece, only for a specific artist

router.delete('/:id', async (req, res, next) => {
    try {
        await Art.findOneAndDelete({ _id: req.params.id, artist: req.user._id })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = router;