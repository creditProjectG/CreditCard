import axios from 'axios';

const CARD_REST_API_URL = 'http://localhost:8000/api/card';

class CardService {

    getCard(){
            return axios.get(CARD_REST_API_URL);
    }

    createCard(card){
        return axios.post(CARD_REST_API_URL, card)
    }

    getCardById(id){
        return axios.get(CARD_REST_API_URL +'/' + id );
    }

    updateCard(id, card){
        return axios.put(CARD_REST_API_URL + '/' + id, card );
    }

    deleteCard(id){
        return axios.delete(CARD_REST_API_URL + '/' + id);
    }

    getCardByCustomerId(c_id){
        return axios.get(CARD_REST_API_URL + '/customer/' + c_id);
    }
}

export default new CardService();