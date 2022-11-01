import React, {useState, useEffect, useRef} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import CustomerService from '../services/CustomerService'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const AddCustomer = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [user_password, setUserPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [customers, setCustomers] = useState([])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmailId] = useState('')
    const [company_name, setCompanyName] = useState('')
    const [address1, setAddress] = useState('')
    const [customerCity, setCustomerCity] = useState('')
    const [customerState, setCustomerState] = useState('')
    const [customerZip, setCustomerZip] = useState('')
    const [mobile_phone, setPhone] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();

    var create = 0

    const saveOrUpdateCustomer = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(user_password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const customer = {id, username, user_password, firstName, lastName, email, company_name, address1, customerCity, customerState, customerZip, mobile_phone}

            for(let index = 0; index < customers.length; index++){
                await CustomerService.getCustomerById(index+1).then((response) => {
                    if (response.data.username === customer.username){
                        create++
                        setErrMsg('Username Taken')
                    }
                }).catch(error => {
                    setErrMsg('Login Failed');
                }) 
            }

            if (create === 0){
                CustomerService.createCustomer(customer).then((response) =>{
                    navigate('/customers');
                }).catch(error => {
                    console.log(error)
                })
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {

        CustomerService.getCustomerById(id).then((response) =>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setUsername(response.data.username)
            setUserPassword(response.data.user_password)
            setEmailId(response.data.email)
            setCompanyName(response.data.company_name)
            setAddress(response.data.address1)
            setCustomerCity(response.data.customerCity)
            setCustomerState(response.data.customerState)
            setCustomerZip(response.data.customerZip)
            setPhone(response.data.mobile_phone)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect (() => {
        CustomerService.getCustomers().then((response) => {
            setCustomers(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }, [])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(user_password));
        setValidMatch(user_password === matchPwd);
    }, [user_password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, user_password, matchPwd])

    const title = () => {

        if(id){
            return <h2 className = "text-center">Update Customer</h2>
        }else{
            return <h2 className = "text-center">Add Customer</h2>
        }
    }


    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                {
                    title()
                }
                    <section>
                            <div className = "form-group mb-2">
                                <label className = "form-label"> First Name:</label>
                                <input
                                    type = "text"
                                    placeholder = "Enter first name"
                                    name = "firstName"
                                    className = "form-control"
                                    value = {firstName}
                                    onChange = {(e) => setFirstName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Last Name:</label>
                                <input
                                    type = "text"
                                    placeholder = "Enter last name"
                                    name = "lastName"
                                    className = "form-control"
                                    value = {lastName}
                                    onChange = {(e) => setLastName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Email:</label>
                                <input
                                    type = "email"
                                    placeholder = "Enter email"
                                    name = "emailId"
                                    className = "form-control"
                                    value = {email}
                                    onChange = {(e) => setEmailId(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Street:</label>
                                <input
                                    type = "street"
                                    placeholder = "Enter street"
                                    name = "street"
                                    className = "form-control"
                                    value = {address1}
                                    onChange = {(e) => setAddress(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> City:</label>
                                <input
                                    type = "city"
                                    placeholder = "Enter city"
                                    name = "city"
                                    className = "form-control"
                                    value = {customerCity}
                                    onChange = {(e) => setCustomerCity(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> State:</label>
                                <input
                                    type = "state"
                                    placeholder = "Enter state"
                                    name = "state"
                                    className = "form-control"
                                    value = {customerState}
                                    onChange = {(e) => setCustomerState(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Zip:</label>
                                <input
                                    type = "zip"
                                    placeholder = "Enter zip"
                                    name = "zip"
                                    className = "form-control"
                                    value = {customerZip}
                                    onChange = {(e) => setCustomerZip(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className = "form-group mb-2">
                                <label className = "form-label"> Phone:</label>
                                <input
                                    type = "phone"
                                    placeholder = "Enter phone"
                                    name = "phone"
                                    className = "form-control"
                                    value = {mobile_phone}
                                    onChange = {(e) => setPhone(e.target.value)}
                                >
                                </input>
                            </div>

                            <section>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <h1>Register</h1>
                                    <label htmlFor="username">
                                        Username:
                                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder = "Enter a valid username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        required
                                        aria-invalid={validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                    />
                                    <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        4 to 24 characters.<br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p>
                                    <label htmlFor="password">
                                        Password:
                                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validPwd || !user_password ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder = "Enter a valid password"
                                        onChange={(e) => setUserPassword(e.target.value)}
                                        value={user_password}
                                        required
                                        aria-invalid={validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                    />
                                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 24 characters.<br />
                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>
                                    <label htmlFor="confirm_pwd">
                                        Confirm Password:
                                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm_pwd"
                                        placeholder = "Repeat password"
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        value={matchPwd}
                                        required
                                        aria-invalid={validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Must match the first password input field.
                                    </p>
                                    <br />
                                <p>
                                    Already registered?<br />
                                    <span className="line">
                                        <a href="/login">Sign In</a>
                                    </span>
                                </p>
                            </section>
                        <br />
                        <button disabled={!validName || !validPwd || !validMatch ? true : false} className = "btn btn-success" onClick = {(e) => saveOrUpdateCustomer(e)}>Submit</button>
                        <Link to="/login" className="btn btn-danger">Cancel</Link>
                    </section>
                </div>
           </div>
        </div>
    )
}

export default AddCustomer