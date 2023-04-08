import React from 'react'
import "../css/PostDetail.css"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

const PostDetail = ({ item, toggleDetails }) => {

    const navigate = useNavigate()

    // toast fun
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    const removePost = (postId) => {


        // console.log(postId);
        if (window.confirm("Do you really want to delete this post ?")) {

            fetch(`/deletePost/${postId}`, {
                method: "delete",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    toggleDetails()
                    navigate("/")
                    notifyB(result.message)

                })

        }

    }





    return (

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
                        <div className="deletePost" onClick={e => removePost(item._id)}>
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </div>

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
                            // value={comment}
                            // onChange={e => setComment(e.target.value)}
                            placeholder='Add a comment'
                        />

                        <button
                            // onClick={e => {
                            //     makeComment(comment, item._id)
                            //     toggleComment()
                            // }}
                            class="comment">Post
                        </button>



                    </div>

                </div>

            </div>

            {/* close comment */}
            <div className="close-comment"
                onClick={e => toggleDetails()}
            >
                <span class="material-symbols-outlined material-symbols-outlined-comment">
                    close
                </span>
            </div>
        </div>
    )
}

export default PostDetail