const router = require('express').Router();

// /api/users
router.route("/")
    .get(getUser)
    .post(createUser);

// /api/users/:id
router.route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//Update and delete a friend by ID
router.route('/:id/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;