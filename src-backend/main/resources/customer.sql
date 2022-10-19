CREATE TABLE customer (
                          customer_id VARCHAR(10) AUTO_INCREMENT PRIMARY KEY,
                          first_name VARCHAR(20),
                          last_name VARCHAR(30),
                          email VARCHAR(50),
                          company_name VARCHAR(20),
                          address1 VARCHAR(200),
                          address2 VARCHAR(200),
                          customer_city VARCHAR(100),
                          customer_state VARCHAR(2),
                          customer_zip VARCHAR(10),
                          mobile_phone VARCHAR(20),
);


INSERT INTO customer (customer_id, first_name, last_name, email, company_name, address1, address2, customer_city, customer_state, customer_zip, mobile_phone)
VALUES(5,'Kate','Witcher','kw@compemail.com','KW Company','89 Apple Road','','Jacksonville','Florida','32034', '880-567-9127');
INSERT INTO customer (customer_id, first_name, last_name, email, company_name, address1, address2, customer_city, customer_state, customer_zip, mobile_phone)
VALUES (4, 'Deb', 'Smith', 'debsmith@compemail.com', 'Smith Company', '77 Woodstock Ave.', '', 'Canton','Georgia','30114', '980-777-1735');
INSERT INTO customer (customer_id, first_name, last_name, email, company_name, address1, address2, customer_city, customer_state, customer_zip, mobile_phone)
VALUES (1, 'James', 'Prouty', 'jprouty@compemail.com', 'Prouty and Company', '123 Main Street', '', 'Canton','Ohio','44701', '123-456-7890');
INSERT INTO customer (customer_id, first_name, last_name, email, company_name, address1, address2, customer_city, customer_state, customer_zip, mobile_phone)
VALUES (2, 'Rob', 'Roy', 'robroy@compemail.com', 'Rob Roy Company', '25 Broad Street', '', 'Woodstock','Georgia','30189', '789-567-2345');
INSERT INTO customer (customer_id, first_name, last_name, email, company_name, address1, address2, customer_city, customer_state, customer_zip, mobile_phone)
VALUES (3, 'Jane', 'Doe', 'janedoe@compemail.com', 'Doe Company', '65 Carol Blvd.', '', 'Charlotte','North Carolina','28105', '367-876-1827');

