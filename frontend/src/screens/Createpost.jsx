import React, { useEffect, useState } from 'react'
import "../css/Createpost.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Createpost = () => {

    const [body, setBody] = useState("")

    const [image, setImage] = useState("")

    const [url, setUrl] = useState("")

    const navigate = useNavigate()

    // toast fun
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    useEffect(() => {

        // saving post to mongodb
        if (url) {

            fetch("/createPost",
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        body,
                        pic: url
                    })

                })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error)
                    } else {
                        notifyB("Successfully Posted")
                        navigate("/")
                    }
                })
                .catch(err => console.log(err))

        }

    }, [url])

    // posting image to cloudinary
    const postDetails = () => {

        console.log(body, image);
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "satyamcloud")
        fetch("https://api.cloudinary.com/v1_1/satyamcloud/image/upload",
            {
                method: "post",
                body: data
            })
            .then(res => res.json())
            .then(data => setUrl(data.url))
            .catch(err => console.log(err))





    }

    const loadfile = () => {

        // that code is copy on google how to preview input image in html stack overfolw
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory

        }

    }

    return <div className='createPost'>

        {/* header */}
        <div className="post-header">

            <h4 style={{ margin: "3px auto" }}>Create New Post</h4>

            <button id='post-btn' onClick={postDetails}>Share</button>

        </div>

        {/* image preview */}
        <div className="main-div">

            <img id='output' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' />

            <input
                onChange={(event) => {
                    loadfile(event)
                    setImage(event.target.files[0])
                }}
                type="file" accept='image/*' />
        </div>

        {/* details */}
        <div className="details">

            {/* details card header */}
            <div className="card-header">

                {/* details card header card pic */}
                <div className="card-pic">
                    <img src="https://images.unsplash.com/photo-1644621596488-25d519a1a8ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc3F1YXJlfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                </div>
                <h5>Ramesh</h5>

            </div>

            <textarea
                value={body}
                onChange={(e) => {
                    setBody(e.target.value)
                }}
                type="text" placeholder='Write a caption...'>

            </textarea>


        </div>


    </div>
}

export default Createpost