import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import CardService from '../services/CardService';
import CustomerService from '../services/CustomerService';
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@mui/material';

const ListCardComponent = () => {

    const {id} = useParams()

    const [card, setCard] = useState([])

    const [customers, setCustomers] = useState([])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect (() => {
        CustomerService.getCustomers().then((response) => {
            setCustomers(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }, [])

    useEffect(() => {
        getCard();
    }, [])

    const getCard = () => {
        CardService.getCard().then((response) => {
            setCard(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteCard = (id) => {
        CardService.deleteCard(id).then((response) => {
            getCard();
        }).catch(error => {
            console.log(error);
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };


    return (
        <div style={{marginLeft: "30px", marginRight: "30px"}}>
            <h1 className="text-center mt-5">Card List</h1>
                <Link to={`/add-card/${id}`} className="btn btn-primary mb-2" > Add Card </Link>
                &nbsp;
                <Link className="btn btn-warning mb-2" to={`/customer`} >Customers List</Link>
            <TableContainer className="table table-bordered table-striped">
                <Table>
                    <TableHead>
                        <TableCell>Card ID</TableCell>
                        <TableCell>CC Number</TableCell>
                        <TableCell>Exp. Month</TableCell>
                        <TableCell>Exp. Year</TableCell>
                        <TableCell>CVV</TableCell>
                        <TableCell>Card Type</TableCell>
                        <TableCell>Options</TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            card.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((
                                user_cards) =>
                                <TableRow key={user_cards.id}>
                                    <TableCell> {user_cards.id}</TableCell>
                                    <TableCell> {user_cards.cc_number}</TableCell>
                                    <TableCell> {user_cards.expire_month}</TableCell>
                                    <TableCell> {user_cards.expire_year}</TableCell>
                                    <TableCell> {user_cards.cvv_id}</TableCell>
                                    <TableCell> {user_cards.card_type_id}</TableCell>
                                    <TableCell>
                                        <button className="btn btn-warning" to={`/edit-card/${user_cards.id}`} >Update</button>
                                        <button className="btn btn-danger" onClick={() => deleteCard(user_cards.customer.id)}
                                        style={{ marginLeft: "10px" }}> Delete</button>
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
        </div >
    )
}
export default ListCardComponent;