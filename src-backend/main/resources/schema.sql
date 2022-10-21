CREATE TABLE IF NOT EXISTS customer (
                          id VARCHAR(255) PRIMARY KEY,
                          username VARCHAR(24),
                          user_password VARCHAR(24),
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