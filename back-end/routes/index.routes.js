const router = require('express').Router()
const { isAuthenticated } = require('./../middlewares/isAuthenticated')

// Get home page

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use('/auth', require('./auth.routes'))
// router.use('/gallery', require('./gallery.routes'))

router.use('/art', require('./art.routes'))
router.use(isAuthenticated)
router.use('/favourite', require('./favourite.routes'))
router.use('/my-profile', require('./user.routes'))

module.exports = router;
