import React, { useContext, useState } from 'react'
import "../css/SignIn.css"
import logo from "../img/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../App';


const SignIn = () => {

    const { setUserLogin } = useContext(LoginContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    // toast fun
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    // regex fun
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const postData = () => {
        // if want to sending data to the console.log then use this
        // console.log({ email, name, userName, password })

        // checking email or password
        if (!emailRegex.test(email)) {
            notifyA("Invalid email")
            return
        }

        // if want to sending data to the server then use this
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })


        })
            .then(res => res.json())
            .then(data => {

                if (data.error) {
                    notifyA(data.error)

                } else {
                    notifyB("Signed In Successfully")
                    console.log(data);

                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))

                    setUserLogin(true)
                    navigate("/")
                }
                console.log(data)
            })
    }

    return <div className="signIn">

        <div>
            <div className="loginForm">

                <img className="signUpLogo" src={logo} alt="" />

                <div>
                    <input value={email} onChange={e => { setEmail(e.target.value) }} type="email" name='email' id='email' placeholder='Email' />
                </div>

                <div>
                    <input value={password} onChange={e => { setPassword(e.target.value) }} type="password" name='password' id='password' placeholder='Password' />
                </div>

                <div>
                    <input onClick={postData} type="submit" id='login-btn' value="Sign In" />
                </div>

            </div>

            <div className="loginForm2">
                Don't have an account ?
                <Link to="/signup">
                    <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
                </Link>
            </div>

        </div>


    </div>
}

export default SignIn