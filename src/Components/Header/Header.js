import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "./Header.css"
import PasswordCheck from "../Functions/password"

const Header = (props) => {
    const [wantLogIn, setWantLogIn] = useState(false)
    const [wantSignUp, setWantSignUp] = useState(false)
    const [loginMail, setLoginMail] = useState("")
    const [loginPass, setLoginPass] = useState("")
    const [loginPassVisible, setLoginPassVisible] = useState(false)
    const [createFirstName, setCreateFirstName] = useState("")
    const [createSurName, setCreateSurName] = useState("")
    const [createMail, setCreateMail] = useState("")
    const [createPassOne, setCreatePassOne] = useState("")
    const [createPassTwo, setCreatePassTwo] = useState("")
    const [CGS, setCGS] = useState(false)
    const [newsletter, setNewsletter] = useState(true)
    const [passOneVis, setPassOneVis] = useState(false)
    const [passTwoVis, setPassTwoVis] = useState(false)

    const matcher = (str1, str2) => {
        let result = false
        if(str1 !== str2 && str1 && str2) {
            result = true
        }
        return result
    }

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
                                <div className="fullname">
                                    <div className="subname">
                                        <label for="create-firstname" className="small-label">First name</label>
                                        <input type="text" placeholder="John" id="create-firstname"
                                        value={createFirstName} className="small-input"
                                        onChange={(e) => {setCreateFirstName(e.target.value)}}></input>
                                    </div>
                                    <div className="subname">
                                        <label for="create-lastname" className="small-label">Surname</label>
                                        <input type="text" placeholder="Smith" id="create-surname"
                                        value={createSurName} className="small-input"
                                        onChange={(e) => {setCreateSurName(e.target.value)}}></input>
                                    </div>
                                </div>
                                <label for="create-email" className="modal-label">Email address</label>
                                <input type="email" placeholder="email@email.com" id="create-email"
                                value={createMail} className="modal-input"
                                onChange={(e) => {setCreateMail(e.target.value)}}></input>
                                <label for="create-pass-one" className="modal-label">Password</label>
                                <div className="password-manager">
                                    <input type={passTwoVis ? "text" : "password"} id="create-pass-one"
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
                                {!PasswordCheck(createPassOne)[0] && 
                                    <span className="redmessage">{PasswordCheck(createPassOne)[1]}</span>
                                }
                                <label for="create-pass-two" className="modal-label">Confirm password</label>
                                <div className="password-manager">
                                    <input type={passOneVis ? "text" : "password"} id="create-pass-two"
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
                                {matcher(createPassOne, createPassTwo) &&
                                    <span className="redmessage">The two passwords that you've entered don't match.</span>
                                }
                                <div className="checkboxes">
                                    <div className="full-checkbox">
                                        <input type="checkbox" id="cgs" className="checking" value={CGS} onClick={
                                            (e) => {if(!CGS) {setCGS(true)} else {setCGS(false)}}}/>
                                        <label for="cgs" className="checklabel">By clicking here, I agree on the general conditions</label>
                                    </div>
                                    <div className="full-checkbox">
                                        <input type="checkbox" id="newsletter" className="checking" value={newsletter}
                                        checked={newsletter ? true : false} onClick={(e) => {if(!newsletter) {setNewsletter(true)} 
                                        else {setNewsletter(false)}}}/>
                                        <label for="newsletter">I want to receive news from us</label>
                                    </div>
                                </div>
                                <div className="sumbit-div">
                                    <button className="submit-red">Sumbit</button>
                                </div>
                            </form>
                            <div className="switchback">
                                <span>You already have an account ?</span>
                                <span className="log" onClick={() => {
                                    setWantLogIn(true); setWantSignUp(false)
                                }}>Log in</span>
                            </div>
                        </div>
                </>
                }
        </header>
    )
}

export default Header