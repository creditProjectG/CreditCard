package com.project.creditcard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CREDIT_CARD")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "cc_number")
    private String cc_number;

    @Column(name = "expire_month")
    private String expire_month;

    @Column(name = "expire_year")
    private String expire_year;

    @Column(name = "cvv_id")
    private String cvv_id;

    @Column(name = "card_type_id")
    private String card_type_id;

    @Column(name = "card_type")
    private String card_type;

    @ManyToOne
    private Customer customer;
}
