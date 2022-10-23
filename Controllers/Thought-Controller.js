const { Thought, User } = require("../models");

const thoughtController = {
    // get all thoughts
    getThought (req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get single thought
    getThoughtById ({ params }, res) {
        Thought
            .findOne({ _id: params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res
                        .status(404)
                        .json({ message: "There is no thought found with that id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },

    //create a thought
    createThought ({ body }, res) {
        Thought.create(body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res
                        .status(404)
                        .json({ message: "There is no thought found with that id!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    //update a thought
    updateThought ({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'There is no thought found with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(400).json(err));
    },

    //delete a thought
    deleteThought ({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'There is no thought found with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(400).json(err));
    },

    //add reaction
    addReaction ({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'there is no reaction by that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //delete a reaction
    deleteReaction ({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'no reaction found by this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },
};

module.exports = thoughtController;