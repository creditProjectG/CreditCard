import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import CustomerService from '../services/CustomerService'

const ListCustomer = () => {

    const {username} = useParams()
    const {user_password} = useParams()

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
            <Link to = "/customer-form" className = "btn btn-primary mb-2" > Add Customer </Link>
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
                    {
                        customers.map(
                            customer =>
                            <tr key = {customer.username && customer.user_password}> 
                                <td> {customer.id}</td>
                                <td> {customer.firstName}</td>
                                <td> {customer.lastName}</td>
                                <td> {customer.email}</td>
                                <td> {customer.address1}</td>
                                <td> {customer.customerCity}</td>
                                <td> {customer.customerState}</td>
                                <td> {customer.customerZip}</td>
                                <td> {customer.mobile_phone}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-customer/${customer.id}`}>Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteCustomer(customer.id)}
                                    style = {{marginLeft:"10px"}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListCustomer