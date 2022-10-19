import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService'

const AddCustomerComponent = () => {
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

    const saveOrUpdateCustomer = (e) => {
        e.preventDefault();

        const customer = {firstName, lastName, email, company_name, address1, customerCity, customerState, customerZip, mobile_phone}

        if(id){
            CustomerService.updateCustomer(id, customer).then((response) => {
                navigate('/customers')
            }).catch(error => {
                console.log(error)
            })

        }else{
            CustomerService.createCustomer(customer).then((response) =>{

                console.log(response.data)
    
                navigate('/customers');
    
            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {

        CustomerService.getCustomerById(id).then((response) =>{
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
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
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
                                <Link to="/customers" className="btn btn-danger">Cancel</Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default AddCustomerComponent
