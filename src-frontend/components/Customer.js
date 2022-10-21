import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import CustomerService from '../services/CustomerService'
import Register from './Register'

const Customer = () => {
    const [username, setUsername] = useState('')
    const [user_password, setUserPassword] = useState('')
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

    const [customers, setCustomers] = useState([])

    const deleteCustomer = (customerId) => {
        CustomerService.deleteCustomer(customerId).then((response) =>{
         getAllCustomers();
 
        }).catch(error =>{
            console.log(error);
        })
         
     }

     const getAllCustomers = () => {
        CustomerService.getCustomers().then((response) => {
            setCustomers(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const saveOrUpdateCustomer = (e) => {
        e.preventDefault();

        const customer = {username, user_password, firstName, lastName, email, company_name, address1, customerCity, customerState, customerZip, mobile_phone}


        CustomerService.createCustomer(customer).then((response) =>{

            console.log(response.data)

            navigate('/customers');

        }).catch(error => {
            console.log(error)
        })

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
        <div className = "container">
            <h2 className = "text-center"> List Customers </h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th> Customer Id </th>
                        <th> Customer First Name </th>
                        <th> Customer Last Name </th>
                        <th> Customer Email </th>
                        <th> Street </th>
                        <th> City </th>
                        <th> State </th>
                        <th> Zip </th>
                        <th> Phone Number </th>
                    </tr>
                </thead>
                <tbody>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>{address1}</td>
                    <td>{customerCity}</td>
                    <td>{customerState}</td>
                    <td>{customerZip}</td>
                    <td>{mobile_phone}</td>
                    <td>
                        <Link className="btn btn-info" to={`/edit-customer/${id}`}>Update</Link>
                        <button className = "btn btn-danger" onClick = {() => deleteCustomer(id)}
                        style = {{marginLeft:"10px"}}>Delete</button>
                    </td>
                </tbody>
            </table>
        </div>
    )
}

export default Customer
