import { React, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import CardService from '../services/CardService';
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';

const ListCard = () => {

    const {id} = useParams()
    
    const [cc_id, setCcId] = useState('')

    const [card, setCard] = useState([])
    const [cards, setCards] = useState([])

    const navigate = useNavigate()

    const deleteCard = (del_id) => {
        CardService.deleteCard(del_id).then((response) => {
            getCreditCardByCustomer(id);
            navigate(`/ListCard/${id}`)
        }).catch(error => {
            console.log(error);
        })
    }

    const getCreditCardByCustomer = (id) => {
        CardService.getCardByCustomerId(id).then((response) => {
            setCards(response.data)
            setCcId(response.data.id)
        }).catch(error => {
            console.log(error);
        })

        CardService.getCard().then((response) => {
            setCard(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getCreditCardByCustomer(id);

        setCcId((card.length)+1)
    }, [])


    return (
        <div>
            <h1 className="text-center">Card List</h1>
                <Link to={`/add-card/${id}/${card.length+1}`} className="btn btn-primary mb-2" > Add Card </Link>
                &nbsp;
                <Link className="btn btn-warning mb-2" to={`/ListCustomer/${id}`} >Customers List</Link>
            <TableContainer className="table table-bordered table-striped">
                <Table>
                    <TableHead>
                            <TableCell>Card ID</TableCell>
                            <TableCell>CC Number</TableCell>
                            <TableCell>Exp. Month</TableCell>
                            <TableCell>Exp. Year</TableCell>
                            <TableCell>CVV</TableCell>
                            <TableCell>Credit/Debit</TableCell>
                            <TableCell>Card Type</TableCell>
                            <TableCell>Options</TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            cards.map((
                                user_cards) =>
                                <TableRow key={user_cards.id}>
                                    <TableCell> {user_cards.id}</TableCell>
                                    <TableCell> {user_cards.cc_number}</TableCell>
                                    <TableCell> {user_cards.expire_month}</TableCell>
                                    <TableCell> {user_cards.expire_year}</TableCell>
                                    <TableCell> {user_cards.cvv_id}</TableCell>
                                    <TableCell> {user_cards.card_type_id}</TableCell>
                                    <TableCell> {user_cards.card_type}</TableCell>
                                    <TableCell>
                                        <Link className="btn btn-warning" to={`/add-card/${user_cards.customer.id}/${user_cards.id}`} >Update</Link>
                                        <button className="btn btn-danger" onClick={() => deleteCard(user_cards.id)}
                                        style={{ marginLeft: "10px" }}> Delete</button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}
export default ListCard;