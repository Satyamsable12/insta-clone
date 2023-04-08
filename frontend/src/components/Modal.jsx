import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import "../css/Modal.css";
import { useNavigate } from 'react-router-dom';

const Modal = ({ setModalOpen }) => {

    const navigate = useNavigate()

    return (

        <div className="darkBg" onClick={e => setModalOpen(false)}>

            <div className="centered">

                <div className="modal">

                    {/* modal header */}
                    <div className="modalHeader">

                        <h5 className="heading">Confirm</h5>
                    </div>

                    <button className='closeBtn' onClick={e => setModalOpen(false)}>
                        <RiCloseLine></RiCloseLine>
                    </button>

                    {/* modal content */}
                    <div className="modalContent">
                        Are you really want to log Out ?
                    </div>

                    <div className="modalActions">
                        <div className="actionsContainer">

                            <button
                                onClick={e => {
                                    setModalOpen(false)
                                    localStorage.clear()
                                    navigate("./signin")
                                }}
                                className='logOutBtn'>Log Out
                            </button>

                            <button
                                className='cancelBtn'
                                onClick={e => setModalOpen(false)}>Cancel
                            </button>

                        </div>
                    </div>

                </div>


            </div>

        </div>

    )
}

export default Modal