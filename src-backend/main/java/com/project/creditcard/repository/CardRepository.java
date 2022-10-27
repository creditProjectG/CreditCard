package com.project.creditcard.repository;

import com.project.creditcard.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer>{
    List<Card> findAllByCustomerId(int customer_id);
}
