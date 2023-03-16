const router = require('express').Router()
const Favourite = require('./../models/Favourite.model')
const isAuthenticated = require('../middlewares/isAuthenticated')




// POST Save an art piece as favourite ROUTE PROTECTED

router.post(`/:artPieceId`, async (req, res, next) => {
    const { artPieceId } = req.params
    const userId = req.user._id

    try {
        const newFavourite = new Favourite({
            user: userId,
            artPiece: artPieceId,
        })

        if (!artPieceId) {
            return res
                .status(404)
                .json({ message: 'Art piece not found' })
        }

        const savedFavourite = await newFavourite.save()
        return res
            .status(201)
            .json({ savedFavourite, message: 'Successfully saved as favourite!' })
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Failed to save as favourite, please try again.', error })
    }
})

// GET Request to get all favourites for a user ROUTE PROTECTED

router.get('/', isAuthenticated, async (req, res, next) => {
    const userId = req.user._id

    try {
        const allFavourites = await Favourite.find({ user: userId }).populate('artPiece')
        return res
            .status(200)
            .json({ allFavourites, message: 'Sucess' })
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Failed to load favourite art pieces. Please try again.', error })
    }
})

// DELETE request to remove from favourite ROUTE PROTECTED

router.delete('/:id', async (req, res, next) => {
    const { artPieceId } = req.params
    const userId = req.user._id

    try {
        const favourite = await Favourite.findOneAndDelete({
            _id: id,
            user: userId,
        })
        if (!favourite) {
            return res
                .status(404)
                .json({ message: 'Favourite not found' })
        }
        return res
            .status(204)
            .end()
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Failed to remove selection from favourites. Please try again.', error })
    }
})

module.exports = router
