import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerComponent from './components/CustomerComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<CustomerComponent />} />
            <Route path="/customer" element={<CustomerComponent />} />
            <Route path="/add-customer" element={<CreateCustomerComponent />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
