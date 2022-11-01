import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListCustomerComponent from './components/ListCustomerComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import AddCustomerComponent from './components/AddCustomerComponent';
import Register from './components/Register';
import Login from './components/Login';
import ListCustomer from './components/ListCustomer';
import AddCardComponent from './components/AddCardComponent';
import ListCardComponent from './components/ListCardComponent';
import ListCard from './components/ListCard';
import AddCustomer from './components/AddCustomer';
import DrillDown from './components/DrillDown';
import DrillDownAll from './components/DrillDownAll';

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
            <Route path="/ListCustomer/:id" element={<ListCustomer />}></Route>
            <Route path="*" element={<Login />}></Route>
            <Route path="/customer-form/:id" element={<AddCustomerComponent />}></Route>
            <Route path="/add-customer" element={<AddCustomer />}></Route>
            <Route path="/edit-customer/:id" element={<AddCustomerComponent />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/add-card/:id/:cc_id" element={<AddCardComponent />}></Route>
            <Route path="/ListCards" element={<ListCardComponent />}></Route>
            <Route path="ListCard/:id" element={<ListCard />}></Route>
            <Route path="/customer-info/:id" element={<DrillDown />}></Route>
            <Route path="/customer_info/:id" element={<DrillDownAll />}></Route>
          </Routes>
          <FooterComponent />
      </Router>
    </div>

  );
}

export default App;
