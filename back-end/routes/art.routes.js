const router = require('express').Router()

const Art = require('./../models/Art.model')


// All routes prefixed by '/api/artPiece

// GET Art

router.get('/', async (req, res, next) => {
    const query = {
        art: req.query.art,
        description: req.query.description,
        title: req.query.title,
        date: req.query.date,
        artist: req.query.artist,
    }
    if (!query.art) {
        delete query.art
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
        const artPiece = await Art.find(query)
        res.json(artPiece)
    } catch (error) {
        next(error)
    }
})

// GET one art piece

router.get('/:id', async (req, res, next) => {
    try {
        const oneArtPiece = await Art.findById(req.params.id)
        res.json({ oneArtPiece })
    } catch (error) {
        next(error)
    }
})

// Create one art piece

router.post('/', async (req, res, next) => {
    try {
        const { art, description, title, date, artist } = req.body
        const createdArt = await Art.create({ art, description, title, date, artist })
        res.status(201).json(createdArt)
    } catch (error) {
        next(error)
    }
})

// Update an art piece

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { art, description, title, date, artist } = req.body

        const updatedArt = await Art.findByIdAndUpdate(
            id,
            {art, description, title, date, artist},
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
        await Art.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = router;