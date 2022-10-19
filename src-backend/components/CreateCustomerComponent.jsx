import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CustomerService from '../services/CustomerService';

function CustomerComponent(props) {

    useEffect(() => {
        CustomerService.getCustomer().then((response) => {
            this.setState({ customer: response.data })
        });
    });
    let navigate=useNavigate();
    function addCustomer() {
        navigate('/add-customer');
    }

        return (
            <div>

                <h1 className="text-center">Customer List</h1>
                <div className="row">
                    <button className="btn btn-primary" style={{ width: "150px", height: "40px" }} onClick={addCustomer}>Add Customer</button>
                </div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <td>Customer ID</td>
                            <td>Customer First Name</td>
                            <td>Customer Last Name</td>
                            <td>Customer email</td>
                            <td>Company Name </td>
                            <td>Address</td>
                            <td>Address</td>
                            <td>City</td>
                            <td>State</td>
                            <td>Zip</td>
                            <td>Mobile Phone</td>
                            <td>Actions</td>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.customer.map(
                                customers =>
                                    <tr key={customers.id}>
                                        <td> {customers.id}</td>
                                        <td> {customers.first_name}</td>
                                        <td> {customers.last_name} </td>
                                        <td> {customers.email} </td>
                                        <td> {customers.company_name} </td>
                                        <td> {customers.address1} </td>
                                        <td> {customers.address2} </td>
                                        <td> {customers.customer_city} </td>
                                        <td> {customers.customer_state} </td>
                                        <td> {customers.customer_zip} </td>
                                        <td> {customers.mobile_phone} </td>

                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        )

}

export default CustomerComponent;