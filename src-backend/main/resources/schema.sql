CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS CREDIT_CARD(
    id INT AUTO_INCREMENT PRIMARY KEY,
    cc_number varchar(16),
    expire_month varchar(2),
    expire_year varchar(4),
    cvv_id varchar(10),
    card_type_id varchar(10),
    customer_id INT
    --FOREIGN KEY (id) REFERENCES customer(id)
);