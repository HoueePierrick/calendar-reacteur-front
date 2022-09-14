import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "./Header.css"

const Header = (props) => {
    const [wantLogIn, setWantLogIn] = useState(false)
    const [wantSignUp, setWantSignUp] = useState(false)
    const [loginMail, setLoginMail] = useState("")
    const [loginPass, setLoginPass] = useState("")
    const [loginPassVisible, setLoginPassVisible] = useState(false)
    const [createUserName, setCreateUserName] = useState("")
    const [createMail, setCreateMail] = useState("")
    const [createPassOne, setCreatePassOne] = useState("")
    const [createPassTwo, setCreatePassTwo] = useState("")
    const [CGS, setCGS] = useState(false)
    const [newsletter, setNewsletter] = useState(true)
    const [passOneVis, setPassOneVis] = useState(false)
    const [passTwoVis, setPassTwoVis] = useState(false)

    return (
        <header className="header">
            <button className="sign-in" onClick={() => {setWantLogIn(true)}}>Sign In</button>
            <button className="sign-up" onClick={() => {setWantSignUp(true)}}>Sign Up</button>
            {wantLogIn ? 
                <>
                    <div className="modal-container"></div>
                    <div className="modal-box">
                        <div className="modaltitlecontain">
                            <span className="modal-title">LOG IN</span>
                        </div>
                        <FontAwesomeIcon icon="xmark" className="xmark" onClick={
                            () => {setWantLogIn(false)}
                        }></FontAwesomeIcon>
                        <form className="form">
                            <label for="email-input" className="modal-label">Email address</label>
                            <input type="email" placeholder="email@email.com" id="email-input"
                            value={loginMail} className="modal-input"
                            onChange={(e) => {setLoginMail(e.target.value)}}></input>
                            <label for="pass-input" className="modal-label">Password</label>
                            <div className="password-manager">
                                <input type={loginPassVisible ? "text" : "password"}  id="pass-input"
                                placeholder="Pass100%Strong!" value={loginPass} className="modal-input"
                                onChange={(e) => {setLoginPass(e.target.value)}}></input>
                                {loginPassVisible ? 
                                    <FontAwesomeIcon icon="eye-slash" className="eye-icon"
                                    onClick={() => {setLoginPassVisible(false)}}></FontAwesomeIcon>
                                :
                                    <FontAwesomeIcon icon="eye" className="eye-icon"
                                    onClick={() => {setLoginPassVisible(true)}}></FontAwesomeIcon>
                                }
                            </div>
                            <div className="sumbit-div">
                                <button className="sumbit">Sumbit</button>
                            </div>
                        </form>
                        <div className="switch">
                            <span>You don't have an account yet ?</span>
                            <span className="create" onClick={() => {
                                setWantLogIn(false); setWantSignUp(true)
                            }}>Create an account</span>
                        </div>
                    </div>
                </>
                : wantSignUp && 
                <>
                    <div className="modal-container"></div>
                    <div className="modal-box">
                        <div className="modaltitlecontain">
                            <span className="modal-title">SIGN UP</span>
                        </div>
                        <FontAwesomeIcon icon="xmark" className="xmark" onClick={
                            () => {setWantSignUp(false)}
                        }></FontAwesomeIcon>
                        <form className="form">
                            <label for="create-email" className="modal-label">Email address</label>
                            <input type="email" placeholder="email@email.com" id="create-email"
                            value={createMail} className="modal-input"
                            onChange={(e) => {setCreateMail(e.target.value)}}></input>
                            <label for="create-pass-one" className="modal-label">Password</label>
                            <div className="password-manager">
                                <input type={passTwoVis ? "text" : "password"} id="create-pass-one"
                                placeholder="Pass100%Strong!" value={createPassTwo} className="modal-input"
                                onChange={(e) => {setCreatePassTwo(e.target.value)}}></input>
                                {passTwoVis ? 
                                    <FontAwesomeIcon icon="eye-slash" className="eye-icon"
                                    onClick={() => {setPassTwoVis(false)}}></FontAwesomeIcon>
                                :
                                    <FontAwesomeIcon icon="eye" className="eye-icon"
                                    onClick={() => {setPassTwoVis(true)}}></FontAwesomeIcon>
                                }
                            </div>
                            <label for="create-pass-two" className="modal-label">Confirm password</label>
                            <div className="password-manager">
                                <input type={passOneVis ? "text" : "password"} id="create-pass-one"
                                placeholder="Pass100%Strong!" value={createPassOne} className="modal-input"
                                onChange={(e) => {setCreatePassOne(e.target.value)}}></input>
                                {passOneVis ? 
                                    <FontAwesomeIcon icon="eye-slash" className="eye-icon"
                                    onClick={() => {setPassOneVis(false)}}></FontAwesomeIcon>
                                :
                                    <FontAwesomeIcon icon="eye" className="eye-icon"
                                    onClick={() => {setPassOneVis(true)}}></FontAwesomeIcon>
                                }
                            </div>
                            <div className="sumbit-div">
                                <button className="submit-red">Sumbit</button>
                            </div>
                        </form>
                        <div className="switchback">
                            <span>You already have an account ?</span>
                            <span className="log" onClick={() => {
                                setWantLogIn(false); setWantSignUp(true)
                            }}>Log in</span>
                        </div>
                    </div>
                </>
                }
        </header>
    )
}

export default Header