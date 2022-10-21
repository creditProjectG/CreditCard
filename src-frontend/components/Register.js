import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCustomerComponent from "./AddCustomerComponent";
import uuid from 'react-uuid';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
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
    const [success, setSuccess] = useState(false);

    const [id, setId] = useState('');

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

    const customer = {id, username, user_password, firstName, lastName, email, company_name, address1, customerCity, customerState, customerZip, mobile_phone}
    
    const unique = uuid();
    const small_id = unique.slice(0, 10)

    useEffect(() => {
        CustomerService.getCustomerById(id).then((response) =>{
            setId(small_id)
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(user_password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            // const customer = {username, user_password, firstName, lastName, email, company_name, address1, customerCity, customerState, customerZip, mobile_phone}
            // const response = await CustomerService.register(customer, username, user_password).then((response) =>{
                const response = await CustomerService.createCustomer(customer).then((response) =>{

                console.log(customer)
                navigate(`/customer/${customer.id}`)
            }).catch(error => {
            })
            
            // TODO: remove console.logs before deployment
            //console.log(JSON.stringify(response))
            setSuccess(true);
            setUsername('');
            setUserPassword('');
            setMatchPwd('');
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

    return (
        <>
            {/* {success ? (
               console.log('success')
                //navigate(`/customer/${customer}`)
            ) : ( */}
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
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


                        <label htmlFor="first_name">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder = "Enter first name"
                            required
                        />
                        

                        <label htmlFor="last_name">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder = "Enter last name"
                            required
                        />


                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            onChange={(e) => setEmailId(e.target.value)}
                            value={email}
                            placeholder = "Enter email"
                            required
                        />


                        <label htmlFor="street">
                            Street:
                        </label>
                        <input
                            type="text"
                            id="street"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address1}
                            placeholder = "Enter street"
                            required
                        />

                        
                        <label htmlFor="city">
                            City:
                        </label>
                        <input
                            type="text"
                            id="city"
                            onChange={(e) => setCustomerCity(e.target.value)}
                            value={customerCity}
                            placeholder = "Enter city"
                            required
                        />

                        
                        <label htmlFor="state">
                            State:
                        </label>
                        <input
                            type="text"
                            id="state"
                            onChange={(e) => setCustomerState(e.target.value)}
                            value={customerState}
                            placeholder = "Enter state"
                            required
                        />

                        
                        <label htmlFor="zip">
                            Zip:
                        </label>
                        <input
                            type="text"
                            id="zip"
                            onChange={(e) => setCustomerZip(e.target.value)}
                            value={customerZip}
                            placeholder = "Enter zip"
                            required
                        />

                        
                        <label htmlFor="phone">
                            Phone:
                        </label>
                        <input
                            type="text"
                            id="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={mobile_phone}
                            placeholder = "Enter phone"
                            required
                        />

                        <br />

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <a href="/login">Sign In</a>
                        </span>
                    </p>
                </section>
            {/* )} */}
        </>
    )
}

export default Register
