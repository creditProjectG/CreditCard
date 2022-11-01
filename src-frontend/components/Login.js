import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../services/CustomerService'
import AuthContext from "../context/AuthProvider";

const Login = () => {
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [customers, setCustomers] = useState([])

    const navigate = useNavigate();

    useEffect (() => {
        CustomerService.getCustomers().then((response) => {
            setCustomers(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }, [])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, user_password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const customer = {username, user_password}

            if(customer.username === 'admin' && customer.user_password === 'adminPass!23'){
                navigate(`/customers`)
            }
            else{
                const index = customers.findIndex(obj => obj.username === username)
                const index2 = customers[index].id
                await CustomerService.getCustomerById(index2).then((response) => {
                    if (response.data.username === customer.username && response.data.user_password === customer.user_password){
                        if (response.data.firstName){
                            navigate(`/ListCustomer/${index2}`)
                        }
                        else{
                            navigate(`/edit-customer/${index2}`)
                        }
                    }
                    else{
                        setErrMsg('Login Failed')
                    }
                })
            }
        } catch (err) {
            setErrMsg('Login Failed');
            errRef.current.focus();
        }
    }

    return (
        <>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setUserPassword(e.target.value)}
                        value={user_password}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?
                    <br />
                    <span className="line">
                        <a href="/register">Sign Up</a>
                    </span>
                </p>
            </section>
        </>
    )
}

export default Login