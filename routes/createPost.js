const express = require("express")
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST")


// route
router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name Photo")
        .populate("comments.postedBy", "_id name")
        // this sort fun is use to create post at desending order
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

// router.get("/allposts", requireLogin, async (req, res) => {
//     try {
//         const posts = await POST.find().populate("postedBy", "_id name Photo")
//                                          .populate("comments.postedBy", "_id name")
//                                           this sort fun is use to create post at desending order
//                                            .sort("-createdAt")
//         res.json(posts);
//     } catch (err) {
//         console.log(err);
//     }
// });



router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body
    console.log(pic);
    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user);
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})

// router.post("/createPost", requireLogin, async (req, res) => {
//     const { body, pic } = req.body;
//     console.log(pic);
//     if (!body || !pic) {
//         return res.status(422).json({ error: "Please add all the fields" });
//     }
//     console.log(req.user);
//     const post = new POST({
//         body,
//         photo: pic,
//         postedBy: req.user
//     });
//     try {
//         const result = await post.save();
//         return res.json({ post: result });
//     } catch (err) {
//         console.log(err);
//     }
// });



router.get("/myposts", requireLogin, (req, res) => {
    // console.log(req.user);
    POST.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        // this sort fun is use to create post at desending order
        .sort("-createdAt")
        .then(myposts => {
            res.json(myposts)
        })
})

// router.get("/myposts", requireLogin, async (req, res) => {
//     try {
//         const myposts = await POST.find({ postedBy: req.user._id })
//             .populate("postedBy", "_id name")
//             .populate("comments.postedBy", "_id name")
//             this sort fun is use to create post at desending order
//              .sort("-createdAt")
//         res.json(myposts);
//     } catch (err) {
//         console.log(err);
//     }
// });



// router.put("/like", requireLogin, (req, res) => {
//     POST.findByIdAndUpdate(req.body.postId, {
//         $push: { likes: req.user._id }
//     }, {
//         new: true
//     })
//      .populate("postedBy", "_id name Photo")
//      .exec((err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         } else {
//             res.json(result)
//         }
//     })
// })

router.put("/like", requireLogin, async (req, res) => {
    try {
        const result = await POST.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, {
            new: true
        })
            .populate("postedBy", "_id name Photo")
        res.json(result);
    } catch (err) {
        return res.status(422).json({ error: err });
    }
});



// router.put("/unlike", requireLogin, (req, res) => {
//     POST.findByIdAndUpdate(req.body.postId, {
//         $pull: { likes: req.user._id }
//     }, {
//         new: true
//     })
//     .populate("postedBy", "_id name Photo")
//      .exec((err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         } else {
//             res.json(result)
//         }
//     })
// })

router.put("/unlike", requireLogin, async (req, res) => {
    try {
        const result = await POST.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, {
            new: true
        })
            .populate("postedBy", "_id name Photo")
        res.json(result);
    } catch (err) {
        return res.status(422).json({ error: err });
    }
});



// router.put("/comment", requireLogin, (req, res) => {
//     const comment = {
//         comment: req.body.text,
//         postedBy: req.user._id
//     }
//     POST.findByIdAndUpdate(req.body.postId, {
//         $push: { comments: comment }
//     }, {
//         new: true
//     })
//         .populate("comments.postedBy", "_id name")
//         .populate("postedBy", "_id name Photo")
//         .exec((err, result) => {
//             if (err) {
//                 return res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//         })

// })

router.put("/comment", requireLogin, async (req, res) => {
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    }
    try {
        const result = await POST.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        }, {
            new: true
        })
            .populate("comments.postedBy", "_id name")
            .populate("postedBy", "_id name Photo")
            .exec();
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});



// api to delete post
// router.delete("/deletePost/:postId", requireLogin, (req, res) => {
//     POST.findOne({ _id: req.params.postId })
//         .populate("postedBy", "_id")
//         .exec((err, post) => {
//             if (err || !post) {
//                 return res.status(422).json({ error: err })
//             }
//             if (post.postedBy._id.toString() === req.user._id.toString()) {
//                 post.remove()
//                     .then(result => {
//                         return res.json({ message: "Successfully deleted" })
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     })
//             }
//         })
// })

router.delete("/deletePost/:postId", requireLogin, async (req, res) => {

    // console.log(req.params.postId);
    try {
        const post = await POST.findOne({ _id: req.params.postId }).populate("postedBy", "_id")

        if (!post) {
            return res.status(422).json({ error: "Post not found" });
        }
        if (post.postedBy._id.toString() === req.user._id.toString()) {
            if (post) {
                await POST.findByIdAndDelete(req.params.postId)
                return res.json({ message: "Successfully deleted" });
            } else {
                return res.status(500).json({ error: "Internal server error" });
            }

        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }


})



// to show following post
router.get("/myfollowingpost", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})




















module.exports = router