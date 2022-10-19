import axios from 'axios';

const CUSTOMER_REST_ARI_URL = 'http://localhost:8000/api/customer';

class CustomerService {

    getCustomer(){
            return axios.get(CUSTOMER_REST_ARI_URL);
    }

}

export default new CustomerService();