import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "./Header.css"
import axios from "axios"
import PasswordCheck from "../Functions/password"
import Cookies from "js-cookie"

const Header = (props) => {
    const {token, setToken} = props

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
    const [createResponse, setCreateResponse] = useState("")
    const [loginResponse, setLoginResponse] = useState("")
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const matcher = (str1, str2) => {
        let result = false  
        if(str1 !== str2 && str1 && str2) {
            result = true
        }
        return result
    }

    const SignUpSubmit = async(event) => {
        event.preventDefault();
        if(!createFirstName) {
            setCreateResponse("Please provide a first name")
        } else if(!createSurName) {
            setCreateResponse("Please provide a surname")
        } else if(!createMail) {
            setCreateResponse("Please provide an email")
        } else if(!PasswordCheck(createPassOne)[0]) {
            setCreateResponse(PasswordCheck(createPassOne)[1])
        } else if(createPassOne !== createPassTwo) {
            setCreateResponse("The two passwords that you've entered don't match.")
        } else if(!CGS) {
            setCreateResponse("Please validate our general conditions before creating your account.")
        } else {
            try {
                const response = await axios.post("https://calendar-reacteur.herokuapp.com/sign-up", {
                    firstname: createFirstName, 
                    surname: createSurName, 
                    email: createMail, 
                    password: createPassOne, 
                    CGS: CGS, 
                    newsletter: newsletter
                })
                Cookies.set("token", response.data.key_info.token, {expires: 7})
                setToken(response.data.key_info.token)
                setIsSignedUp(true)
                setWantSignUp(false)
                // THIS MAY CAUSE A BUG IN DEPLOY
                setCreateFirstName("")
                setCreateSurName("")
                setCreateMail("")
                setCreatePassOne("")
                setCreatePassTwo("")
                setCGS(false)
                setNewsletter(true)
                setPassOneVis(false)
                setPassTwoVis(false)
            } catch (error) {
                setCreateResponse(error.response.data.message)
            }
        }
    }

    const LogInSubmit = async(event) => {
        event.preventDefault()
        if(!loginMail) {
            setLoginResponse("Please provide an email address to log in")
        } else if(!loginPass) {
            setLoginPass("Please type in your password")
        } else {
            try {
                const response = await axios.get(`https://calendar-reacteur.herokuapp.com/log-in?email=${loginMail}&password=${loginPass}`)
                Cookies.set("token", response.data.account.token, {expires: 7})
                setToken(response.data.account.token)
                setIsLoggedIn(true)
                setWantLogIn(false)
                // THIS MAY CAUSE A BUG IN DEPLOY
                setLoginMail("")
                setLoginPass("")
            } catch (error) {
                setLoginResponse(error.response.data.message)
            }
        }
    }

    return (
        <header className="header">
            {!token ?
            <>
                <button className="sign-in" onClick={() => {setWantLogIn(true)}}>Sign In</button>
                <button className="sign-up" onClick={() => {setWantSignUp(true)}}>Sign Up</button>
            </>
            :
            <button className="log-out" onClick={() => {Cookies.remove("token"); setToken("")}}>Log Out</button>
            }
            {isSignedUp ?
            <>
                <div className="modal-container"></div>
                <div className="modal-box">
                    <div className="modaltitlecontaintwo">
                        <span className="modal-title">You're signed up with success!</span>
                    </div>
                    <FontAwesomeIcon icon="xmark" className="xmark" onClick={
                        () => {setIsSignedUp(false)}
                    }></FontAwesomeIcon>
                </div>
            </>
            : isLoggedIn ?
            <>
                <div className="modal-container"></div>
                <div className="modal-box">
                    <div className="modaltitlecontaintwo">
                        <span className="modal-title">You're logged-in with success!</span>
                    </div>
                    <FontAwesomeIcon icon="xmark" className="xmark" onClick={
                        () => {setIsLoggedIn(false)}
                    }></FontAwesomeIcon>
                </div>
            </> :
            wantLogIn ? 
                <>
                    <div className="modal-container"></div>
                    <div className="modal-box">
                        <div className="modaltitlecontain">
                            <span className="modal-title">LOG IN</span>
                        </div>
                        <FontAwesomeIcon icon="xmark" className="xmark" onClick={
                            () => {setWantLogIn(false)}
                        }></FontAwesomeIcon>
                        <form className="form" onSubmit={LogInSubmit}>
                            <label htmlFor="email-input" className="modal-label">Email address</label>
                            <input type="email" placeholder="email@email.com" id="email-input"
                            value={loginMail} className="modal-input"
                            onChange={(e) => {setLoginMail(e.target.value)}}></input>
                            <label htmlFor="pass-input" className="modal-label">Password</label>
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
                        {loginResponse && <div className="create-error">{loginResponse}</div>}
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
                            <form className="form" onSubmit={SignUpSubmit}>
                                <div className="fullname">
                                    <div className="subname">
                                        <label htmlFor="create-firstname" className="small-label">First name</label>
                                        <input type="text" placeholder="John" id="create-firstname"
                                        value={createFirstName} className="small-input"
                                        onChange={(e) => {setCreateFirstName(e.target.value)}}></input>
                                    </div>
                                    <div className="subname">
                                        <label htmlFor="create-lastname" className="small-label">Surname</label>
                                        <input type="text" placeholder="Smith" id="create-surname"
                                        value={createSurName} className="small-input"
                                        onChange={(e) => {setCreateSurName(e.target.value)}}></input>
                                    </div>
                                </div>
                                <label htmlFor="create-email" className="modal-label">Email address</label>
                                <input type="email" placeholder="email@email.com" id="create-email"
                                value={createMail} className="modal-input"
                                onChange={(e) => {setCreateMail(e.target.value)}}></input>
                                <label htmlFor="create-pass-one" className="modal-label">Password</label>
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
                                {!PasswordCheck(createPassOne)[0] && 
                                    <span className="redmessage">{PasswordCheck(createPassOne)[1]}</span>
                                }
                                <label htmlFor="create-pass-two" className="modal-label">Confirm password</label>
                                <div className="password-manager">
                                    <input type={passTwoVis ? "text" : "password"} id="create-pass-two"
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
                                        <input type="checkbox" id="cgs" className="checking" value={CGS} onChange={
                                            (e) => {if(!CGS) {setCGS(true)} else {setCGS(false)}}} checked={CGS ? true : false}/>
                                        <label htmlFor="cgs" className="checklabel">By clicking here, I agree on the general conditions</label>
                                    </div>
                                    <div className="full-checkbox">
                                        <input type="checkbox" id="newsletter" className="checking" value={newsletter}
                                        checked={newsletter ? true : false} onChange={(e) => {if(!newsletter) {setNewsletter(true)} 
                                        else {setNewsletter(false)}}}/>
                                        <label htmlFor="newsletter">I want to receive news from us</label>
                                    </div>
                                </div>
                                <div className="sumbit-div">
                                    <button className="submit-red">Sumbit</button>
                                </div>
                            </form>
                            {createResponse && <div className="create-error">{createResponse}</div>}
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