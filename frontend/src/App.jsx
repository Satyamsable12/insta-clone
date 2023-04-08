import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/Modal'
import UserProfile from './components/UserProfile'
import MyFollowingPost from './screens/MyFollowingPost'
import Createpost from './screens/Createpost'
import Profile from './screens/Profile'
import Home from './screens/Home'



export const LoginContext = createContext()


function App() {

  const [modalOpen, setModalOpen] = useState(false)

  const [userLogin, setUserLogin] = useState(false)

  return (
    <BrowserRouter>

      <div className="App">

        <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>

          <Navbar login={userLogin} />

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            {/* if exact path profile then profile show otherwise path profile userid then show userprofile */}
            <Route exact path='/profile' element={<Profile />} />
            <Route path='/createPost' element={<Createpost />} />
            <Route path='/profile/:userid' element={<UserProfile />} />
            <Route path='/followingpost' element={<MyFollowingPost />} />

          </Routes>

          <ToastContainer theme="dark" />

          {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}




        </LoginContext.Provider>

      </div>

    </BrowserRouter>
  )
}

export default App
