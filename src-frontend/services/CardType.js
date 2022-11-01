import axios from 'axios';

const CARD_REST_API_URL = 'http://localhost:8000/api/card_type';

class CardService {

    getCard(){
            return axios.get(CARD_REST_API_URL);
    }
}

export default new CardService();