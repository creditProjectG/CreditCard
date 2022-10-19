package com.project.creditcard.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name ="firstName")
    private String firstName;
    @Column(name ="lastName")
    private String lastName;
    @Column(name ="email")
    private String email;

    @Column(name ="companyName")
    private String companyName;

    @Column(name ="address1")
    private String address1;

    @Column(name ="address2")
    private String address2;

    @Column(name ="customerCity")
    private String customerCity;

    @Column(name ="customerState")
    private String customerState;

    @Column(name ="customerZip")
    private String customerZip;

    @Column(name ="mobilePhone")
    private String mobile_phone;
}
