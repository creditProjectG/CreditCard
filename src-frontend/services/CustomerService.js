import axios from 'axios';

const CUSTOMER_BASE_REST_API_URL = 'http://localhost:8000/api';

class CustomerService {

    getCustomers(){
        return axios.get(CUSTOMER_BASE_REST_API_URL);
    }
    
    createCustomer(customer){
        return axios.post(CUSTOMER_BASE_REST_API_URL, customer)
    }

    retrieveCustomer(username, user_password){
        return axios.get(CUSTOMER_BASE_REST_API_URL + '/' + username, user_password);
    }

    getCustomerById(customerId){
        return axios.get(CUSTOMER_BASE_REST_API_URL + '/' + customerId);
    }

    updateCustomer(customerId, customer){
        return axios.put(CUSTOMER_BASE_REST_API_URL + '/' + customerId, customer);
    }

    deleteCustomer(customerId){
        return axios.delete(CUSTOMER_BASE_REST_API_URL + '/' + customerId);
    }

}

export default new CustomerService();