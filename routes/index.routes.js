const router = require('express').Router()
const isAuthenticated = require('./../middlewares/isAuthenticated')
const fileUpload = require('../config/cloudinary-config')

// Get home page

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use('/auth', require('./auth.routes'))
// router.use('/gallery', require('./gallery.routes'))

router.use('/art', require('./art.routes'))
router.use(isAuthenticated)
// router.post("/images", fileUpload.single('image'), (req, res, next) => {
//   console.log(req.file.path);
//   res.json({ image: req.file.path });
// })
router.use('/favourites', require('./favourite.routes'))
// router.use('/my-profile', require('./user.routes'))

module.exports = router;
