INSERT INTO customer (username, user_password, first_name, last_name, email, address1, customer_city, customer_state, customer_zip, mobile_phone)
VALUES ('user1', 'Password!23', 'Martha', 'Brown', 'marthabrown123@gmail.com', '123 Main St', 'Gainesville', 'GA', '30507', '770-555-2323');
INSERT INTO customer (username, user_password, first_name, last_name, email, address1, customer_city, customer_state, customer_zip, mobile_phone)
VALUES ('user2', 'Password!23', 'Martha', 'Brown', 'marthabrown123@gmail.com', '123 Main St', 'Gainesville', 'GA', '30507', '770-555-2323');
INSERT INTO customer (username, user_password, first_name, last_name, email, address1, customer_city, customer_state, customer_zip, mobile_phone)
VALUES ('user3', 'Password!23', 'Martha', 'Brown', 'marthabrown123@gmail.com', '123 Main St', 'Gainesville', 'GA', '30507', '770-555-2323');
INSERT INTO customer (username, user_password, first_name, last_name, email, address1, customer_city, customer_state, customer_zip, mobile_phone)
VALUES ('user4', 'Password!23', 'Martha', 'Brown', 'marthabrown123@gmail.com', '123 Main St', 'Gainesville', 'GA', '30507', '770-555-2323');
INSERT INTO customer (username, user_password, first_name, last_name, email, address1, customer_city, customer_state, customer_zip, mobile_phone)
VALUES ('user5', 'Password!23', 'Martha', 'Brown', 'marthabrown123@gmail.com', '123 Main St', 'Gainesville', 'GA', '30507', '770-555-2323');

INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('1234123412341234', '03', '2025', '012', 'Debit', 'MASTERCARD', 1);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('4321432143214321', '06', '2023', '592', 'Credit', 'VISA', 1);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('9876987698769876', '12', '2026', '621', 'Credit', 'AMERICAN EXPRESS', 1);

INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('1234123412341234', '03', '2025', '012', 'Debit', 'MASTERCARD', 2);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('4321432143214321', '06', '2023', '592', 'Credit', 'VISA', 2);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('9876987698769876', '12', '2026', '621', 'Credit', 'AMERICAN EXPRESS', 2);

INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('1234123412341234', '03', '2025', '012', 'Debit', 'MASTERCARD', 3);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('4321432143214321', '06', '2023', '592', 'Credit', 'VISA', 3);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('9876987698769876', '12', '2026', '621', 'Credit', 'AMERICAN EXPRESS', 3);

INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('1234123412341234', '03', '2025', '012', 'Debit', 'MASTERCARD', 4);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('4321432143214321', '06', '2023', '592', 'Credit', 'VISA', 4);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('9876987698769876', '12', '2026', '621', 'Credit', 'AMERICAN EXPRESS', 4);

INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('1234123412341234', '03', '2025', '012', 'Debit', 'MASTERCARD', 5);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('4321432143214321', '06', '2023', '592', 'Credit', 'VISA', 5);
INSERT INTO CREDIT_CARD (cc_number, expire_month, expire_year, cvv_id, card_type_id, card_type, customer_id)
VALUES ('9876987698769876', '12', '2026', '621', 'Credit', 'AMERICAN EXPRESS', 5);

INSERT INTO CARD_TYPE (c_type)
VALUES ('VISA');
INSERT INTO CARD_TYPE (c_type)
VALUES ('MASTERCARD');
INSERT INTO CARD_TYPE (c_type)
VALUES ('AMERICAN EXPRESS');