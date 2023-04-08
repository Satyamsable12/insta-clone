import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png'
import "../css/SignUp.css";
import { toast } from 'react-toastify';

const SignUp = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [name, setName] = useState("")

    const [userName, setUserName] = useState("")

    const [password, setPassword] = useState("")

    // toast fun
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    // regex fun
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const postData = () => {
        // if want to sending data to the console.log then use this
        // console.log({ email, name, userName, password })

        // checking email or password
        if (!emailRegex.test(email)) {
            notifyA("Invalid email")
            return
        } else if (!passRegex.test(password)) {
            notifyA("Password must be contain at least 8 characters, including at least 1 number and 1 including both lower and uppercase letters and special characters for example #,$,%")
            return
        }

        // if want to sending data to the server then use this
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                userName: userName,
                email: email,
                password: password
            })


        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {

                    notifyA(data.error)
                } else {
                    notifyB(data.message)
                    navigate("/signin")
                }
                console.log(data)
            })
    }

    return <div className="signUp">

        <div className="form-container">

            <div className='form'>

                <img className="signUpLogo" src={logo} alt="" />

                <p className="loginPara ">
                    Sign up to see photos and videos <br /> from your friends
                </p>

                <div>
                    <input value={email} onChange={e => { setEmail(e.target.value) }} type="email" name='email' id='email' placeholder='Email' />
                </div>

                <div>
                    <input value={name} onChange={e => { setName(e.target.value) }} type="text" name='name' id='name' placeholder='Full Name' />
                </div>

                <div>
                    <input value={userName} onChange={e => { setUserName(e.target.value) }} type="text" name='username' id='username' placeholder='Username' />
                </div>

                <div>
                    <input value={password} onChange={e => { setPassword(e.target.value) }} type="password" name='password' id='password' placeholder='Password' />
                </div>

                <p className="loginPara" style={{ fontSize: "12px", margin: "3px 0px" }}>
                    By signing up, you agree to out Terms, <br /> privacy policy and cookies policy.
                </p>

                <input onClick={postData} type="submit" id='submit-btn' value="Sign Up" />

            </div>

            <div className="form2">
                Already have an account ?
                <Link to="/signin" style={{ color: "blue", cursor: "pointer" }}>Sign In</Link>

            </div>

        </div>


    </div>
}

export default SignUp