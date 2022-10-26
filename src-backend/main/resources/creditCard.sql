CREATE TABLE CREDIT_CARD(
    id INT AUTO_INCREMENT PRIMARY KEY,
    cc_number varchar(16),
    expire_month varchar(2),
    expire_year varchar(4),
    cvv_id varchar(10),
    card_type_id varchar(10),
    customer_id INT
    --FOREIGN KEY (id) REFERENCES customer(id)
);