import React, {useState, useEffect, useRef} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import CustomerService from '../services/CustomerService'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const AddCustomerComponent = () => {
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

        try {
            const customer = {id, username, user_password, firstName, lastName, email, company_name, address1, customerCity, customerState, customerZip, mobile_phone}

            
            CustomerService.createCustomer(customer).then((response) =>{
                navigate(`/ListCustomer/${id}`);
            }).catch(error => {
                console.log(error)
            })
        }catch (err) {
            console.log(err)
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

    const cancel = () => {
        navigate(`/ListCustomer/${id}`)
    }

    const title = () => {
        return <h2 className = "text-center">Add/Update Information</h2>
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

                        <button className = "btn btn-success" onClick = {(e) => saveOrUpdateCustomer(e)}>Submit</button>
                        <button onClick = {() => cancel()} className="btn btn-danger">Cancel</button>
                    </section>
                </div>
           </div>
        </div>
    )
}

export default AddCustomerComponent
