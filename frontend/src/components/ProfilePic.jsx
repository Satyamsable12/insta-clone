import React, { useEffect, useRef, useState } from 'react'

const ProfilePic = ({ changeprofile }) => {

    const hiddenFileInput = useRef(null)

    const [image, setImage] = useState("")

    const [url, setUrl] = useState("")

    // posting image to cloudinary
    const postDetails = () => {

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

    const postPic = () => {

        // saving post to mongodb
        fetch("/uploadProfilePic",
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    pic: url
                })

            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                changeprofile()
                window.location.reload()
            })
            .catch(err => console.log(err))


    }

    const handleClick = () => {
        // when we use useref fun then always use variable name.current ie  hiddenFileInput.current
        hiddenFileInput.current.click()

    }

    useEffect(() => {
        if (image) {

            postDetails()
        }
    }, [image])

    useEffect(() => {
        if (url) {

            postPic()
        }
    }, [url])


    return <div className="profilePic darkBg">
        <div className="changePic centered">

            <div>
                <h2>Change Profile Photo</h2>
            </div>

            <div style={{ borderTop: "1px solid #00000030" }}>

                <button
                    onClick={handleClick}
                    className='upload-btn'
                    style={{ color: "#1EA1F7", }}>Upload Photo
                </button>

                <input
                    ref={hiddenFileInput}
                    onChange={e => setImage(e.target.files[0])}
                    type="file"
                    accept='image/*'
                    style={{ display: "none" }}
                />

            </div>

            <div style={{ borderTop: "1px solid #00000030" }}>

                <button
                    onClick={e => {
                        setUrl(null)
                        postPic()
                    }}
                    className='upload-btn'
                    style={{ color: "#ED4956" }}>Remove Current Photo
                </button>

            </div>

            <div style={{ borderTop: "1px solid #00000030" }}>

                <button
                    onClick={changeprofile}
                    style={{
                        background: "none",
                        cursor: "pointer",
                        border: "none",
                        fontSize: "15px"
                    }}>Cancel
                </button>

            </div>

        </div>
    </div>

}

export default ProfilePic