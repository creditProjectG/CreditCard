import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListCustomerComponent from './components/ListCustomerComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import AddCustomerComponent from './components/AddCustomerComponent';
import Register from './components/Register';
import Login from './components/Login';
import Customer from './components/Customer';
import ListCustomer from './components/ListCustomer';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
          <Routes>
            <Route index element={<Login />} />
            <Route path="/" element={<Login />}></Route> 
            <Route path="/register" element={<Register />}></Route>
            <Route path="/customers" element={<ListCustomerComponent />}></Route>
            <Route path="/customer/:id" element={<Customer />}></Route>
            <Route path="/ListCustomer/:username/:user_password" element={<ListCustomer />}></Route>
            <Route path="*" element={<Login />}></Route>
            <Route path="/customer-form" element={<AddCustomerComponent />}></Route>
            <Route path="/edit-customer/:id" element={<AddCustomerComponent />}></Route>
          </Routes>
          <FooterComponent />
      </Router>
    </div>

  );
}

export default App;
