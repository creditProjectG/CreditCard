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
import AddCardComponent from './components/AddCardComponent';
import ListCardComponent from './components/ListCardComponent';

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
            <Route path="/ListCustomer/:id" element={<ListCustomer />}></Route>
            <Route path="*" element={<Login />}></Route>
            <Route path="/customer-form/:id" element={<AddCustomerComponent />}></Route>
            <Route path="/edit-customer/:id" element={<AddCustomerComponent />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/add-card/:id" element={<AddCardComponent />}></Route>
            <Route path="/ListCards/:id" element={<ListCardComponent />}></Route>
          </Routes>
          <FooterComponent />
      </Router>
    </div>

  );
}

export default App;
