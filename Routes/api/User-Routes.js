const router = require('express').Router();
const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../Controllers/User-Controller");

// /api/users
router.route("/")
    .get(getUser)
    .post(createUser);

// /api/users/:id
router.route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//Add and delete a friend by ID to/from friends list
router.route('/:id/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;