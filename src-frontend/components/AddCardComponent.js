import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardService from '../services/CardService';
import CustomerService from '../services/CustomerService';
import CardType from '../services/CardType';

const USER_REGEX = /^[A-z]$/;

const AddCardComponent = () => {

    const [cc_number, setcc_number] = useState('')
    const [expire_month, setexpire_month] = useState('')
    const [expire_year, setexpire_year] = useState('')
    const [cvv_id, setcvv_id] = useState('')
    const [card_type_id, setcard_type_id] = useState('')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [user_password, setUserPassword] = useState('')
    const [email, setEmailId] = useState('')
    const [company_name, setCompanyName] = useState('')
    const [address1, setAddress] = useState('')
    const [customerCity, setCustomerCity] = useState('')
    const [customerState, setCustomerState] = useState('')
    const [customerZip, setCustomerZip] = useState('')
    const [mobile_phone, setPhone] = useState('')
    const [card_type, setCardTypeId] = useState('')

    const [validName, setValidName] = useState(false);

    const [cardType, setCardType] = useState([])

    const {id} = useParams()
    const {cc_id} = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        CustomerService.getCustomerById(id).then((response) =>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setUsername(response.data.username)
            setUserPassword(response.data.user_password)
            setEmailId(response.data.email)
            setCompanyName(response.data.company_name)
            setAddress(response.data.address1)
            setCustomerCity(response.data.customerCity)
            setCustomerState(response.data.customerState)
            setCustomerZip(response.data.customerZip)
            setPhone(response.data.mobile_phone)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(card_type));
    }, [card_type])

    useEffect(() => {
        CardType.getCard().then((response) => {
            setCardType(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }, [])

    const saveOrUpdateCard = (e) => {
        e.preventDefault();

        const customer = {id, username, user_password, firstName, lastName, email, company_name, address1, customerCity, customerState, customerZip, mobile_phone}

        const card = { cc_id, cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer }

        if(card.card_type){
            CardService.createCard(card).then((response) => {
                navigate(`/ListCustomer/${id}`);
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {

        CardService.getCardById(cc_id).then((response) => {
            setcc_number(response.data.cc_number)
            setexpire_month(response.data.expire_month)
            setexpire_year(response.data.expire_year)
            setcvv_id(response.data.cvv_id)
            setcard_type_id(response.data.card_type_id)
            setCardTypeId(response.data.card_type)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if (cc_id) {
            return <h2 className="text-center">Update  Card</h2>
        } else {
            return <h2 className="text-center">Add  Card</h2>
        }
    }

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">  Card Number :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter  Card Number"
                                        name="cc_number"
                                        className="form-control"
                                        value={cc_number}
                                        onChange={(e) => setcc_number(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Expiration Month (mm):</label>
                                    <input
                                        type="text"
                                        placeholder="Enter 2 digit expiration month"
                                        name="expire_montn"
                                        className="form-control"
                                        value={expire_month}
                                        onChange={(e) => setexpire_month(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Expiration Year (yyyy):</label>
                                    <input
                                        type="text"
                                        placeholder="4 digit Expiration Year"
                                        name="expire_year"
                                        className="form-control"
                                        value={expire_year}
                                        onChange={(e) => setexpire_year(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> CVV:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter CVV"
                                        name="cvv_id"
                                        className="form-control"
                                        value={cvv_id}
                                        onChange={(e) => setcvv_id(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Debit/Credit:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter  or Debit"
                                        name="card_type_id"
                                        className="form-control"
                                        value={card_type_id}
                                        onChange={(e) => setcard_type_id(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Card Type:</label>
                                    <br />
                                    <select aria-invalid={validName ? "false" : "true"} onChange={(e) => setCardTypeId(e.target.value)}>
                                        <option value="none" selected disabled hidden>* Select an Option</option>
                                        {
                                            cardType.map((
                                                card_type) =>
                                                <option key={card_type.id}>{card_type.c_type}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <button className="btn btn-success mb-2 mt-3" onClick={(e) => saveOrUpdateCard(e)} >Submit </button>
                                <Link to={`/ListCustomer/${id}`} className="btn btn-danger"> Cancel </Link>                                
                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default AddCardComponent;