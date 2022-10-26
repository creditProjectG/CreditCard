package com.project.creditcard.Service;

import com.project.creditcard.model.Card;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.creditcard.repository.CardRepository;

@Service
public class CardService {
    @Autowired
    CardRepository cardRepository;

    public List getCard() {
        List cards = new ArrayList();
        cardRepository.findAll().forEach(card -> cards.add(card));
        return cards;
    }

    public Card getCardById(int id){
        return cardRepository.findById(id).get();
    }

    public void saveOrUpdate(Card card){
        cardRepository.save(card);
    }

    public void delete(int id){
        cardRepository.deleteById(id);
    }
}
