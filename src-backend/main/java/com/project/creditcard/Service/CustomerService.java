package com.project.creditcard.Service;


import com.project.creditcard.model.Customer;
import com.project.creditcard.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    public List getCustomer() {
        List customers = new ArrayList();
        customerRepository.findAll().forEach(customer -> customers.add(customer));
        return customers;
    }

    public Customer getCustomerById(long id) {
        return customerRepository.findById(id).get();
    }

    public void saveOrUpdate(Customer customer) {
        customerRepository.save(customer);
    }

    public void delete(long id) {
        customerRepository.deleteById(id);
    }
}
