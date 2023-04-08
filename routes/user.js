const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST")
const USER = mongoose.model("USER")
const requireLogin = require("../middlewares/requireLogin");

// to get user profile
// router.get("/user/:id", (req, res) => {
//     USER.findOne({ _id: req.params.id })
//         .select("-password")
//         .then(user => {
//             POST.find({ postedBy: req.params.id })
//                 .populate("postedBy", "_id")
//                 .exec((err, post) => {
//                     if (err) {

//                         return res.status(422).json({ error: err })
//                     }
//                     res.status(200).json({ user, post })
//                 })

//         })
//         .catch(err => {
//             return res.status(404).json({ error: "User not found" })

//         })

// })

router.get("/user/:id", (req, res) => {
    USER.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            POST.find({ postedBy: req.params.id })
                .populate("postedBy", "_id")
                .exec()
                .then(post => {
                    res.status(200).json({ user, post })
                })
                .catch(err => {
                    return res.status(422).json({ error: err })
                })

        })
        .catch(err => {
            return res.status(404).json({ error: "User not found" })

        })

})


// to follow user
// router.put("/follow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $push: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         USER.findByIdAndUpdate(req.user._id, {
//             $push: { following: req.body.followId }

//         }, {
//             new: true
//         })
//             .then(result => res.json(result))
//             .catch(err => { return res.status(422).json({ error: err }) })
//     })
// })

router.put("/follow", requireLogin, async (req, res) => {
    try {
        const followedUser = await USER.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true }
        ).exec();
        const followingUser = await USER.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true }
        ).exec();
        res.json(followingUser);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});



// to unfollow user
// router.put("/unfollow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $pull: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         USER.findByIdAndUpdate(req.user._id, {
//             $pull: { following: req.body.followId }

//         }, {
//             new: true
//         })
//             .then(result => res.json(result))
//             .catch(err => { return res.status(422).json({ error: err }) })
//     })
// })

router.put("/unfollow", requireLogin, async (req, res) => {
    try {
        const result1 = await USER.findByIdAndUpdate(req.body.followId, {
            $pull: { followers: req.user._id },
        }, { new: true });

        const result2 = await USER.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId },
        }, { new: true });

        res.json(result2);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});



// to upload profile pic
// router.put("/uploadProfilePic", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.user._id, {
//         // we use $set repalce to $push bcoz push method create array and img link add on that arr but i want delete befor link and add new link thats y use $set fun that work properly
//         $set: { Photo: req.body.pic }
//     }, {
//         new: true
//     })
//         .exec((err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//         })
// })

router.put("/uploadProfilePic", requireLogin, async (req, res) => {
    try {
        const result = await USER.findByIdAndUpdate(req.user._id, {
            // we use $set repalce to $push bcoz push method create array and img link add on that arr but i want delete befor link and add new link thats y use $set fun that work properly
            $set: { Photo: req.body.pic }
        }, {
            new: true
        }).exec();
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});





module.exports = router