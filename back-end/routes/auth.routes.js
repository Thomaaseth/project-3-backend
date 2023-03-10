const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const isAuthenticated = require('../middlewares/isAuthenticated.js')
const User = require('./../models/User.model')

// All routes prefixed by /api/auth

router.post('/signup', async (req, res, next) => {
    const { email, username, password, isArtist } = req.body

    if (!username || !password || !email || !isArtist) {
        return res
            .status(400)
            .json({ message: 'Please fill all requider fields' })
    }
    try {
        const foundUsername = await User.findOne({ username: username })
        if (foundUsername) {
            return res
                .status(400)
                .json({ message: 'This username is already taken, please choose another one.' })
        }
        const foundUserEmail = await User.findOne({ email: email })
        if (foundUserEmail) {
            return res
                .status(400)
                .json({ message: 'An account associated to this email already exists. Please use login.' })
        }
        const generatedSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, generatedSalt)

        await User.create({
            email,
            username,
            password: hashedPassword,
            isArtist,
        })
        return res
            .status(201)
            .json({ message: 'You have successfully created your account!' })
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Something went wrong during signup. Please try again.', error })
    }
})

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: 'Please provide your username and password.' })
    }
    try {
        const foundUsername = await User.findOne({ username }).select('password')
        if (!foundUsername) {
            return res
                .status(401)
                .json({ message: 'Wrong username. Please make sure your username is correct.' })
        }
        const matchingPasswords = await bcrypt.compare(password, foundUsername.password)
        if (!matchingPasswords) {
            return res
                .status(401)
                .json({ message: 'Wrong password. Please make sure your password is correct' })
        }
        const token = jsonWebToken.sign(
            { id: foundUsername._id },
            process.env.TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '2d',
            }
        )
        return res.status(200).json({ token, message: 'Session created.' })
    } catch (error) {
        next(error)
    }
})

router.get('/profile', isAuthenticated, async (req, res, next) => {
    res.json(req.user)
})

module.exports = router