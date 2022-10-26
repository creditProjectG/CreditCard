import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import CardService from '../services/CardService';

const ListCardComponent = () => {

    const [card, setCard] = useState([])

    useEffect(() => {
        getCard();
    }, [])

    const getCard = () => {
        CardService.getCard.then((response) => {
            setCard(response.data)
            console.log(response.data);
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


    return (
        <div>
            <br></br>
            <br></br>
            <h1 className="text-center">Card List</h1>
                <Link to="/add-card" className="btn btn-primary mb-2" > Add Card </Link>
                <Link className="btn btn-warning" to={`/customer`} >Customers List</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Card ID</th>
                        <th>CC Number</th>
                        <th>Exp. Month</th>
                        <th>Exp. Year</th>
                        <th>CVV</th>
                        <th>Card Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        card.map((
                            cards) =>
                            <tr key={cards.id}>
                                <th> {cards.id}</th>
                                <th> {cards.cc_number}</th>
                                <th> {cards.expire_month}</th>
                                <th> {cards.expire_year}</th>
                                <th> {cards.cvv_id}</th>
                                <th> {cards.card_type_id}</th>
                                <th> {cards.customer_id} </th>
                                <th>
                                    <Link className="btn btn-warning" to={`/edit-card/${cards.id}`} >Update</Link></th>
                                <th><button className="btn btn-danger" onClick={() => deleteCard(cards.customer_id)}
                                    style={{ marginLeft: "10px" }}> Delete</button></th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div >
    )
}
export default ListCardComponent;