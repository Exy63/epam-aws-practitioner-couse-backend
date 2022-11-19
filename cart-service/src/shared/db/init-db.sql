CREATE TABLE IF NOT EXISTS "carts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL default now(),
	"updated_at" timestamp NOT NULL default now()
);

CREATE TABLE IF NOT EXISTS "cart_items" (
	"cart_id" uuid REFERENCES "carts" ("id"),
	"product_id" uuid,
	"count" integer
);

INSERT INTO "carts" ("id", "created_at", "updated_at") 
	VALUES 
	('5f39884c-af73-4f02-be89-95eb7825c78e', current_timestamp, current_timestamp), 
	('107066ee-ee78-4188-b6ed-614c626579f4', current_timestamp, current_timestamp), 
	('93a3519f-527d-4727-9934-27cef0d6bd00', current_timestamp, current_timestamp);

INSERT INTO "cart_items" ("cart_id", "product_id", "count") 
	VALUES 
	('5f39884c-af73-4f02-be89-95eb7825c78e', '1c02e02b-7a04-47e3-8a37-205dcaf3b000', 3), 
	('107066ee-ee78-4188-b6ed-614c626579f4', '1c02e02b-7a04-47e3-8a37-205dcaf3b000', 6),  
	('93a3519f-527d-4727-9934-27cef0d6bd00', '1c02e02b-7a04-47e3-8a37-205dcaf3b000', 5);
