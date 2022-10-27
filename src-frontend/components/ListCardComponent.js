import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import CardService from '../services/CardService';
import CustomerService from '../services/CustomerService';

const ListCardComponent = () => {

    const {id} = useParams()

    const [card, setCard] = useState([])
    const [cards, setCards] = useState([])

    const [customers, setCustomers] = useState([])

    useEffect (() => {
        CustomerService.getCustomers().then((response) => {
            setCustomers(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }, [])

    useEffect(() => {
        getCard();
        getCards();
    }, [])

    const getCard = () => {
        CardService.getCard().then((response) => {
            setCard(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const getCards = async () => {
        for(let index = 0; index < card.length; index++){
            console.log("for")
            await CardService.getCardById(index+1).then((response) => {
                console.log("await")
                if (response.data.customer.id === id){
                    console.log("if")
                    setCards(response.data)
                }
            }).catch(error => {
                console.log(error)
            }) 
        }
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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cards.map((
                            user_cards) =>
                            <tr key={user_cards.id}>
                                <th> {user_cards.id}</th>
                                <th> {user_cards.cc_number}</th>
                                <th> {user_cards.expire_month}</th>
                                <th> {user_cards.expire_year}</th>
                                <th> {user_cards.cvv_id}</th>
                                <th> {user_cards.card_type_id}</th>
                                <th>
                                    <button className="btn btn-warning" to={`/edit-card/${user_cards.id}`} >Update</button></th>
                                <th>
                                    <button className="btn btn-danger" onClick={() => deleteCard(user_cards.customer.id)}
                                    style={{ marginLeft: "10px" }}> Delete</button>
                                </th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div >
    )
}
export default ListCardComponent;