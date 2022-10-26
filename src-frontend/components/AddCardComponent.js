import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardService from '../services/CardService';

const AddCardComponent = () => {

    const [cc_number, setcc_number] = useState('')
    const [expire_month, setexpire_month] = useState('')
    const [expire_year, setexpire_year] = useState('')
    const [cvv_id, setcvv_id] = useState('')
    const [card_type_id, setcard_type_id] = useState('')
    const [customer_id, setcustomer_id] = useState('')


    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdateCard = (e) => {
        e.preventDefault();

        const card = { cc_number, expire_month, expire_year, cvv_id, card_type_id, customer_id }

        // if (id) {
        //     CardService.updateCard(id, card).then((response) => {
        //     navigate('/ListCards')
        //     }).catch(error => {
        //         console.log(error)
        //     })

        // } else {
            CardService.createCard(card).then((response) => {

                //console.log(response.data)

                navigate('/ListCards');

            }).catch(error => {
                console.log(error)
            })
        // }

    }

    useEffect(() => {

        CardService.getCardById(id).then((response) => {
            setcc_number(response.data.cc_number)
            setexpire_month(response.data.expire_month)
            setexpire_year(response.data.expire_year)
            setcvv_id(response.data.cvv_id)
            setcard_type_id(response.data.card_type_id)
            setcustomer_id(response.data.customer_id)
        }).catch(error => {
            console.log(error)
        })
    }, [id])

    const title = () => {

        if (id) {
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
                                    <label className="form-label"> Card Type (debit or ):</label>
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
                                    <label className="form-label"> Customer ID:</label>
                                    <input
                                        type="text"
                                        placeholder="Customer ID"
                                        name="custerom_id"
                                        className="form-control"
                                        value={customer_id}
                                        onChange={(e) => setcustomer_id(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className="btn btn-success" onClick={(e) => saveOrUpdateCard(e)} >Submit </button>
                                <Link to="/customers" className="btn btn-danger"> Cancel </Link>
                                <Link className="btn btn-warning" to={`/customer/${customer_id}/_cards`} >Back To Customer Info</Link>
                                
                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default AddCardComponent;