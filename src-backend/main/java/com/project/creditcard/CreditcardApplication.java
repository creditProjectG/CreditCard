package com.project.creditcard;

import com.project.creditcard.model.Customer;
import com.project.creditcard.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CreditcardApplication {

	public static void main(String[] args) {

		SpringApplication.run(CreditcardApplication.class, args);
	}

	@Autowired
	private CustomerRepository customerRepository;
}
