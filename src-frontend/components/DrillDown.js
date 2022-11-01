import React, {useState, useEffect, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomerService from '../services/CustomerService'
import CardService from '../services/CardService';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const DrillDown = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [user_password, setUserPassword] = useState('')

    const [customers, setCustomers] = useState([])
    const [cards, setCards] = useState([])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmailId] = useState('')
    const [company_name, setCompanyName] = useState('')
    const [address1, setAddress] = useState('')
    const [customerCity, setCustomerCity] = useState('')
    const [customerState, setCustomerState] = useState('')
    const [customerZip, setCustomerZip] = useState('')
    const [mobile_phone, setPhone] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();

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

    useEffect (() => {
        CustomerService.getCustomers().then((response) => {
            setCustomers(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }, [])

    useEffect (() => {
        getCreditCardByCustomer(id)
    }, [])

    const getCreditCardByCustomer = (id) => {
        CardService.getCardByCustomerId(id).then((response) => {
            setCards(response.data)
            
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteCustomer = async (customerId) => {

        for(let index = 0; index < cards.length; index++){
            await CardService.getCardById(index+1).then((response) => {
                CardService.deleteCard(index+1).then(() => {
                }).catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                console.log(error);
            })
        }

        CustomerService.deleteCustomer(customerId).then((response) =>{
         getAllCustomers();
        }).catch(error =>{
            console.log(error);
        })
        
        navigate(`/login`)
     }

    const viewCards = () => {
        navigate(`/ListCard/${id}`)
    }
    const editCustomer = () => {
        navigate(`/edit-customer/${id}`)
    }
    const cancel = () => {
        navigate(`/ListCustomer/${id}`)
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <h2 className = "text-center"><u>{firstName} {lastName}</u></h2>
                    <section  className="mb-5">
                        <div style={{ fontSize: "150%" }}>
                            <div>
                                <label><b>Email:</b> {email}</label>
                            </div>
                            <div>
                                <label><b>Address:</b> {address1}, {customerCity}, {customerState} {customerZip}</label>
                            </div>
                            <div>
                                <label><b>Phone Number:</b> {mobile_phone}</label>
                            </div>
                        </div>
                        
                        <div className="mt-5 text-center" style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <button className="btn btn-primary" onClick={() => viewCards()}>View Cards</button>
                            &nbsp;
                            <button className="btn btn-success" onClick={() => editCustomer()}>Edit</button>
                            &nbsp;
                            <button className="btn btn-danger" onClick={() => cancel()}>Cancel</button>
                        </div>
                        <button className="btn btn-danger mt-5" onClick={() => deleteCustomer(id)}>Delete Account</button>
                    </section>
                </div>
           </div>
        </div>
    )
}

export default DrillDown