import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CustomerService from '../services/CustomerService'
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@mui/material';

const ListCustomerComponent = () => {
    const [customers, setCustomers] = useState([])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

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

    return (
        <div className = "container">
            <h2 className = "text-center mt-5"> List Customers </h2>
            <Link to = "/add-customer" className = "btn btn-primary mb-2" > Add Customer </Link>
            <TableContainer className="table table-bordered table-striped">
                <Table>
                    <TableHead>
                        <TableCell> Customer First Name </TableCell>
                        <TableCell> Customer Last Name </TableCell>
                        <TableCell> Street </TableCell>
                        <TableCell> City </TableCell>
                        <TableCell> State </TableCell>
                        <TableCell> Zip </TableCell>
                        <TableCell> Phone Number </TableCell>
                        <TableCell></TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                                customer =>
                                <TableRow key = {customer.id}> 
                                    <TableCell> {customer.firstName}</TableCell>
                                    <TableCell> {customer.lastName}</TableCell>
                                    <TableCell> {customer.address1}</TableCell>
                                    <TableCell> {customer.customerCity}</TableCell>
                                    <TableCell> {customer.customerState}</TableCell>
                                    <TableCell> {customer.customerZip}</TableCell>
                                    <TableCell> {customer.mobile_phone}</TableCell>
                                    <TableCell>
                                        <Link className="btn btn-info" to={`/customer-info/${customer.id}`}>Options</Link>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={handleChangePage}
            />
        </div>
    )
}

export default ListCustomerComponent