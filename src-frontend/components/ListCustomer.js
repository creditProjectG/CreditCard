import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import CustomerService from '../services/CustomerService'


const ListCustomer = () => {
    const {id} = useParams()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [user_password, setUserPassword] = useState('')
    const [email, setEmailId] = useState('')
    const [address1, setAddress] = useState('')
    const [customerCity, setCustomerCity] = useState('')
    const [customerState, setCustomerState] = useState('')
    const [customerZip, setCustomerZip] = useState('')
    const [mobile_phone, setPhone] = useState('')
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getAllCustomers();
    }, [])

    const getAllCustomers = () => {
        CustomerService.getCustomers().then((response) => {
            setCustomers(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    useEffect(() => {
        CustomerService.getCustomerById(id).then((response) =>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setUsername(response.data.username)
            setUserPassword(response.data.user_password)
            setEmailId(response.data.email)
            setAddress(response.data.address1)
            setCustomerCity(response.data.customerCity)
            setCustomerState(response.data.customerState)
            setCustomerZip(response.data.customerZip)
            setPhone(response.data.mobile_phone)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const deleteCustomer = (customerId) => {
       CustomerService.deleteCustomer(customerId).then((response) =>{
        getAllCustomers();

       }).catch(error =>{
           console.log(error);
       })
    }

    return (
        <div className = "container">
            <h2 className = "text-center"> List Customers </h2>
            <Link to={`/add-card/${id}`} className = "btn btn-primary mb-2" > Add Card </Link>
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
                        <th> Options </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> {id}</td>
                        <td> {firstName}</td>
                        <td> {lastName}</td>
                        <td> {email}</td>
                        <td> {address1}</td>
                        <td> {customerCity}</td>
                        <td> {customerState}</td>
                        <td> {customerZip}</td>
                        <td> {mobile_phone}</td>
                        <td>
                            <Link className="btn btn-info" to={`/edit-customer/${id}`}>Update</Link>
                            <button className = "btn btn-danger" onClick = {() => deleteCustomer(id)}
                            style = {{marginLeft:"10px"}}>Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ListCustomer