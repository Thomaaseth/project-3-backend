const router = require('express').Router()
const isAuthenticated = require('./../middlewares/isAuthenticated')

// Get home page

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use('/auth', require('./auth.routes'))

router.use('/art', require('./art.routes'))
router.use(isAuthenticated)

router.use('/favourites', require('./favourite.routes'))

module.exports = router;
