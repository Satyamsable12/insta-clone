import React, { useEffect, useState } from 'react'
import "../css/Home.css";
import { Link, json, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {

    var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

    const navigate = useNavigate()

    const [data, setData] = useState([])

    const [comment, setComment] = useState("")

    const [show, setShow] = useState(false)

    const [item, setItem] = useState([])

    // toast fun
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    useEffect(() => {

        const token = localStorage.getItem("jwt")
        if (!token) {
            navigate("./signup")
        }

        // fetching all posts
        fetch("/allposts", {

            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setData(result)
            })
            .catch(err => console.log(err))


    }, [])

    // to show and hide comment
    const toggleComment = (posts) => {
        if (show) {
            setShow(false)
            // console.log("hide");
        } else {
            setShow(true)
            setItem(posts)
            // console.log(item);
            // console.log("show");
        }
    }

    const likePost = (id) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then((result) => {
                const newData = data.map((posts) => {
                    if (posts._id == result._id) {
                        return result
                    } else {
                        return posts
                    }
                })
                setData(newData)
                console.log(result);
            })

    }

    const unlikePost = (id) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then((result) => {
                const newData = data.map((posts) => {
                    if (posts._id == result._id) {
                        return result
                    } else {
                        return posts
                    }
                })
                setData(newData)
                console.log(result);
            })
    }

    // function to make comment
    const makeComment = (text, id) => {
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text: text,
                postId: id
            })
        })
            .then(res => res.json())
            .then((result) => {

                const newData = data.map((posts) => {
                    if (posts._id == result._id) {
                        return result
                    } else {
                        return posts
                    }
                })
                setData(newData)
                setComment("")
                notifyB("Comment posted")
                console.log(result);
            })
    }

    return <div className="home">

        {/* card */}
        {
            data.map((posts) => {

                return <>
                    <div className="card">

                        {/* card header */}
                        <div className="card-header">

                            <div className="card-pic">

                                <img
                                    src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
                                    alt=""
                                />
                            </div>

                            <h5>
                                <Link to={`/profile/${posts.postedBy._id}`}>
                                    {posts.postedBy.name}
                                </Link>
                            </h5>


                        </div>

                        {/* card image */}
                        <div className="card-image">
                            <img src={posts.photo} alt="" />

                        </div>

                        {/* card content */}
                        <div className="card-content">

                            {
                                posts.likes.includes(
                                    JSON.parse(localStorage.getItem("user"))._id
                                ) ? (
                                    <span
                                        onClick={e => unlikePost(posts._id)}
                                        class="material-symbols-outlined material-symbols-outlined-red">favorite
                                    </span>
                                ) : (
                                    <span
                                        onClick={e => likePost(posts._id)}
                                        class="material-symbols-outlined">favorite
                                    </span>

                                )

                            }





                            <p>{posts.likes.length} Likes</p>
                            <p>{posts.body}</p>

                            <p
                                style={{ fontWeight: "bold", cursor: "pointer" }}
                                onClick={e => toggleComment(posts)}
                            > View all comments

                            </p>

                        </div>

                        {/* add comment */}
                        <div className="add-comment">

                            <span
                                class="material-symbols-outlined">mood
                            </span>

                            <input
                                type="text"
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder='Add a comment'
                            />

                            <button
                                onClick={e => makeComment(comment, posts._id)}
                                class="comment">Post
                            </button>



                        </div>


                    </div>

                </>
            })
        }

        {/* show comment */}
        {
            show && (

                <div className="showComment">

                    <div className="container">

                        <div className="postPic">
                            <img src={item.photo} alt="" />
                        </div>

                        <div className="details">
                            {/* show comment card header */}
                            <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>

                                <div className="card-pic">

                                    <img src="https://images.unsplash.com/photo-1644621596488-25d519a1a8ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc3F1YXJlfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                </div>
                                <h5>{item.postedBy.name}</h5>

                            </div>

                            {/* show comment comment section */}
                            <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>

                                {
                                    item.comments.map((comment) => {
                                        return (
                                            <p className='comm'>
                                                <span className='commenter' style={{ fontWeight: "bolder" }}>{comment.postedBy.name} </span>
                                                <span className='commentText'>{comment.comment}</span>
                                            </p>
                                        )
                                    })
                                }

                            </div>

                            {/* show comment card content */}
                            <div className="card-content">

                                <p>{item.likes.length} Likes</p>
                                <p>{item.body}</p>

                            </div>

                            {/* show comment add comment */}
                            <div className="add-comment">

                                <span
                                    class="material-symbols-outlined">mood
                                </span>

                                <input
                                    type="text"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    placeholder='Add a comment'
                                />

                                <button
                                    onClick={e => {
                                        makeComment(comment, item._id)
                                        toggleComment()
                                    }}
                                    class="comment">Post
                                </button>



                            </div>

                        </div>

                    </div>

                    {/* close comment */}
                    <div className="close-comment" onClick={toggleComment}>
                        <span class="material-symbols-outlined material-symbols-outlined-comment">
                            close
                        </span>
                    </div>
                </div>

            )


        }




    </div>
}

export default Home