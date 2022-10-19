import React from 'react';
import { useNavigate } from "react-router-dom";
import CustomerService from '../services/CustomerService';

class CustomerComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            customer: []
        }
        this.addCustomer = this.addCustomer.bind(this);
    }

    componentDidMount() {
        CustomerService.getCustomer().then((response) => {
            this.setState({ customer: response.data })
        });
    }

    addCustomer() {
        let navigate=useNavigate();
        this.props.navigate.push('/add-customer');
    }


    render() {
        return (
            <div>

                <h1 className="text-center">Customer List</h1>
                <div className="row">
                    <button className="btn btn-primary" style={{ width: "150px", height: "40px" }} onClick={this.addCustomer}>Add Customer</button>
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
}

export default CustomerComponent;