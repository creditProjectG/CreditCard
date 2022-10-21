package com.project.creditcard.controller;

import com.project.creditcard.model.Customer;
import com.project.creditcard.repository.CustomerRepository;
import com.project.creditcard.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;

// import com.project.creditcard.exception.ResourceNotFoundException;
// import net.javaguides.springboot.model.Customer;
// import net.javaguides.springboot.repository.CustomerRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    // build create customer REST API
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    // build get customer by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Customer> getId(@PathVariable String id){
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not exist with id:" + id));
        return ResponseEntity.ok(customer);
    }

    // build update customer REST API
    @PutMapping("{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable String id,@RequestBody Customer customerDetails) {
        Customer updateCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not exist with id: " + id));

        updateCustomer.setFirstName(customerDetails.getFirstName());
        updateCustomer.setLastName(customerDetails.getLastName());
        updateCustomer.setEmail(customerDetails.getEmail());
        updateCustomer.setAddress1(customerDetails.getAddress1());
        updateCustomer.setCustomerCity(customerDetails.getCustomerCity());
        updateCustomer.setCustomerState(customerDetails.getCustomerState());
        updateCustomer.setCustomerZip(customerDetails.getCustomerZip());
        updateCustomer.setMobile_phone(customerDetails.getMobile_phone());

        customerRepository.save(updateCustomer);

        return ResponseEntity.ok(updateCustomer);
    }

    // build delete customer REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteCustomer(@PathVariable String id){

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not exist with id: " + id));

        customerRepository.delete(customer);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
