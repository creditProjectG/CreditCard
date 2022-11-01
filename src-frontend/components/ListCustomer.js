import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import CustomerService from '../services/CustomerService'
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@mui/material';


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

    return (
        <div className = "container">
            <h2 className = "text-center mt-5 mb-5"> Customer Info </h2>
            <TableContainer className="table table-bordered table-striped mb-5">
                <Table>
                    <TableHead>
                        <TableCell> Customer First Name </TableCell>
                        <TableCell> Customer Last Name </TableCell>
                        <TableCell> Street </TableCell>
                        <TableCell> City </TableCell>
                        <TableCell> State </TableCell>
                        <TableCell> Zip </TableCell>
                        <TableCell> Phone Number </TableCell>
                        <TableCell>Options</TableCell>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell> {firstName}</TableCell>
                            <TableCell> {lastName}</TableCell>
                            <TableCell> {address1}</TableCell>
                            <TableCell> {customerCity}</TableCell>
                            <TableCell> {customerState}</TableCell>
                            <TableCell> {customerZip}</TableCell>
                            <TableCell> {mobile_phone}</TableCell>
                            <TableCell>
                                <Link 
                                    className="btn btn-info" 
                                    to={`/customer-info/${id}`}>
                                    Options
                                </Link>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ListCustomer