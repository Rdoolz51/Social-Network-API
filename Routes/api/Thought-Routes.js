const router = require('express').Router();
const {
    getThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../Controllers/Thought-Controller');

// /api/thoughts
router.route('/')
    .get(getThought)
    .post(createThought);

// /api/thoughts/:id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction);


router.route('/:thoughtId/reactions/:reactionId')
    .put(deleteReaction);

module.exports = router;