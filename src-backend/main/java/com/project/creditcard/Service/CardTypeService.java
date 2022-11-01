package com.project.creditcard.Service;

import com.project.creditcard.model.Card;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.creditcard.repository.CardRepository;

@Service
public class CardTypeService {
    @Autowired
    CardRepository cardTypeRepository;

    public List getCard() {
        List cards = new ArrayList();
        cardTypeRepository.findAll().forEach(card -> cards.add(card));
        return cards;
    }

    public Card getCardById(int id){
        return cardTypeRepository.findById(id).get();
    }

    public void saveOrUpdate(Card card){
        cardTypeRepository.save(card);
    }

    public void delete(int id){
        cardTypeRepository.deleteById(id);
    }
}
