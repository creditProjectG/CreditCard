package com.project.creditcard.controller;

import com.project.creditcard.model.CardType;
import com.project.creditcard.repository.CardTypeRepository;
import com.project.creditcard.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/api/card_type")
public class CardTypeController {
    @Autowired
    private CardTypeRepository cardTypeRepository;

    @GetMapping
    public List<CardType> getAllCards(){
        return cardTypeRepository.findAll();
    }

    @PostMapping
    public CardType createCard(@RequestBody CardType card){
        return cardTypeRepository.save(card);
    }

    @GetMapping("{id}")
    public ResponseEntity<CardType> getId(@PathVariable int id){
        CardType card = cardTypeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CardType does not exist with id: " + id));
            return ResponseEntity.ok(card);
    }

    @PutMapping("{id}")
    public ResponseEntity<CardType> updateCard(@PathVariable int id, @RequestBody CardType cardInfo){
        CardType updateCard = cardTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CardType does not exist"));
            updateCard.setC_type(updateCard.getC_type());
        cardTypeRepository.save(updateCard);
        return ResponseEntity.ok(updateCard);
}

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteCard(@PathVariable int id){
        CardType card = cardTypeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("CardType does not exist with id: " + id));

        cardTypeRepository.delete(card);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
