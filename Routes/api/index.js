const router = require('express').Router();
const userRoutes = require('./User-Routes');
const thoughtRoutes = require('./Thought-Routes');

router.use('./users', userRoutes);
router.use('./thoughts', thoughtRoutes);

module.exports = router;