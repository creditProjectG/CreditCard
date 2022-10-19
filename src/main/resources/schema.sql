CREATE TABLE IF NOT EXISTS customer (
                          id int AUTO_INCREMENT PRIMARY KEY,
                          first_name VARCHAR(20),
                          last_name VARCHAR(30),
                          email VARCHAR(50),
                          company_name VARCHAR(20),
                          address1 VARCHAR(200),
                          address2 VARCHAR(200),
                          customer_city VARCHAR(100),
                          customer_state VARCHAR(2),
                          customer_zip VARCHAR(10),
                          mobile_phone VARCHAR(20)
);