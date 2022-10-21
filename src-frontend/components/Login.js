import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import CustomerService from '../services/CustomerService'

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [customers, setCustomers] = useState([])

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {id} = useParams();

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

            const response = await CustomerService.retrieveCustomer(username, user_password).then((response) => {
                
            }).catch(error => {
                console.log(error)
            })
            
            const accessToken = response?.customer?.id;
            //const roles = response?.data?.roles;
            //setAuth({ username, user_password, roles, accessToken });
            navigate(`/ListCustomer/${username}/${user_password}`)
            //navigate(`/ListCustomer/`)
            setUsername('');
            setUserPassword('');
            //setSuccess(true);
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {/* {success ? (
                navigate('/customers')
            ) : ( */}
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
                        Need an Account?<br />
                        <span className="line">
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            {/* )} */}
        </>
    )
}

export default Login
