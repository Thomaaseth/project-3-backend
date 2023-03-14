const User = require('./../models/User.model')


function isArtist(req, res, next) {
    if (req.user.isArtist) {
        return next()
    }
    res.status(403).json({ message: 'access forbidden' })
}

module.exports = isArtist