-- carts
CREATE TABLE IF NOT EXISTS "carts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL default now(),
	"updated_at" timestamp NOT NULL default now()
);
INSERT INTO "carts" ("id", "created_at", "updated_at") 
	VALUES 
	('5f39884c-af73-4f02-be89-95eb7825c78e', current_timestamp, current_timestamp), 
	('107066ee-ee78-4188-b6ed-614c626579f4', current_timestamp, current_timestamp), 
	('93a3519f-527d-4727-9934-27cef0d6bd00', current_timestamp, current_timestamp);

-- cart_items
CREATE TABLE IF NOT EXISTS "cart_items" (
	"cart_id" uuid REFERENCES "carts" ("id"),
	"product_id" uuid,
	"count" integer
);
INSERT INTO "cart_items" ("cart_id", "product_id", "count") 
	VALUES 
	('5f39884c-af73-4f02-be89-95eb7825c78e', '1c02e02b-7a04-47e3-8a37-205dcaf3b000', 3), 
	('107066ee-ee78-4188-b6ed-614c626579f4', '1c02e02b-7a04-47e3-8a37-205dcaf3b000', 6),  
	('93a3519f-527d-4727-9934-27cef0d6bd00', '1c02e02b-7a04-47e3-8a37-205dcaf3b000', 5);

-- users
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" VARCHAR ( 50 ) UNIQUE NOT NULL,
	"email" VARCHAR ( 255 ) UNIQUE,
	"password" VARCHAR ( 50 ) NOT NULL
);
INSERT INTO "users" ("id", "name", "email", "password") 
	VALUES 
	('9ae6f337-87c8-4c27-b36e-bbd10df2221f', 'Maria', 'Maria@mail.fast', 'secret_password'), 
	('bb05ed83-cfcf-4690-a5e1-fd83f7b77edc', 'Peter', null , 'peterParker1999'),  
	('59904ebf-7173-45fa-a752-8f833077e41c', 'Ilya', 'helloWorld@code.com', 'youBetterNotToKnowIt');

-- orders
CREATE TYPE "order_status" AS ENUM('paid', 'delivered');
CREATE TABLE IF NOT EXISTS "orders" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid REFERENCES "users" ("id"),
	"cart_id" uuid REFERENCES "carts" ("id"),
	"payment" JSON NOT NULL,
	"delivery" JSON NOT NULL,
	"comments" VARCHAR ( 255 ),
	"status" order_status NOT NULL,
	"total" INTEGER NOT NULL
);
INSERT INTO "orders" ("id", "user_id", "cart_id", "payment", "delivery", "comments", "status", "total") 
	VALUES 
	('1bb2bb6c-be1d-49bf-add5-807b3fbaee6c', '59904ebf-7173-45fa-a752-8f833077e41c', '5f39884c-af73-4f02-be89-95eb7825c78e', '{"type":"card"}', '{"type":"PTT","address":"Izmir, Turkey"}', 'Please deliver the order to my office!', 'paid', 1000),
	('f8b4eceb-4317-40e0-99d4-47dc20ad1dd9', '9ae6f337-87c8-4c27-b36e-bbd10df2221f', '107066ee-ee78-4188-b6ed-614c626579f4', '{"type":"card"}', {"type":"US Mail","address":"Cincinnati, Ohio, USA"}, null, 'delivered', 500);





