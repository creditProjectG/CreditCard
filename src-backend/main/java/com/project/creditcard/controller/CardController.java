package com.project.creditcard.controller;

import com.project.creditcard.model.Card;
import com.project.creditcard.repository.CardRepository;
import com.project.creditcard.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/api/card")
public class CardController {
    @Autowired
    private CardRepository cardRepository;

    @GetMapping
    public List<Card> getAllCards(){
        return cardRepository.findAll();
    }

    //get cards by customer id
    @GetMapping("/customer/{customer_id}")
    public List<Card> getCreditCardByCustomerId(@PathVariable int customer_id) {
        return cardRepository.findAllByCustomerId(customer_id);
    }

    @DeleteMapping("/customer/{customer_id}")
    public ResponseEntity<HttpStatus> deleteCardByCustomerId(@PathVariable int id){
        //List<Card> card = cardRepository.findAllByCustomerId(id);

        cardRepository.deleteAllByCustomerId(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping
    public Card createCard(@RequestBody Card card){
        return cardRepository.save(card);
    }

    @GetMapping("{id}")
    public ResponseEntity<Card> getId(@PathVariable int id){
        Card card = cardRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Card does not exist with id: " + id));
            return ResponseEntity.ok(card);
    }

    @PutMapping("{id}")
    public ResponseEntity<Card> updateCard(@PathVariable int id, @RequestBody Card cardInfo){
        Card updateCard = cardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Card does not exist"));
            updateCard.setCc_number(updateCard.getCc_number());
            updateCard.setExpire_month(updateCard.getExpire_month());
            updateCard.setExpire_year(updateCard.getExpire_year());
            updateCard.setCvv_id(updateCard.getCvv_id());
            updateCard.setCard_type_id(updateCard.getCard_type_id());
        cardRepository.save(updateCard);
        return ResponseEntity.ok(updateCard);
}

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteCard(@PathVariable int id){
        Card card = cardRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Card does not exist with id: " + id));

        cardRepository.delete(card);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
