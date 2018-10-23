# leaf
This is an online store application which can be used to manage different users & products and track location of delivery agent.
App is build on Node.js and uses Mongodb as a database. MQTT is used for tracking the location of delivery agent.
This App contain three schemas i.e., user schema, product schema and order schema.

# run app
1. open terminal
2. go to the root directory
3. run command "npm install"
4. run command "npm start"

# Track location of delivery agent
1. open url "localhost:3000 in browser.
2. insert lat n long and click on send button
3. agent location is sent to consumer by using MQTT protocol which is lightweight in comparison to HTTP protocol.

# save user api
url:
localhost:3000/user

method:
post

request:
{
	"firstName": "nishant",
	"lastName": "srivastava",
	"email":"imnishanrsrivastava@gmail.com",
	"phone":"9968439443",
	"role":"agent"
}

response:
{
    "data": null,
    "message": "User saved successfully",
    "code": 200
}

# get user list api
url:
localhost:3000/user/list

method:
get

response:
{
    "data": [
        {
            "location": {
                "lat": 0,
                "long": 0
            },
            "firstName": "ayush",
            "lastName": "chauhan",
            "role": "consumer",
            "isAvailable": 1,
            "addedOn": 1540122677853,
            "modifiedOn": 1540122677853,
            "isActive": 1,
            "isDeleted": 0,
            "_id": "5bcc68356135c102bce55f48",
            "email": "imayushchauhan@gmail.com",
            "phone": "9968439442",
            "__v": 0
        },
        {
            "location": {
                "lat": 12412421,
                "long": 2412421
            },
            "firstName": "nishant",
            "lastName": "srivastav",
            "role": "agent",
            "isAvailable": 0,
            "addedOn": 1540127462041,
            "modifiedOn": 1540319877398,
            "isActive": 1,
            "isDeleted": 0,
            "_id": "5bcc7ae6b560731784678f80",
            "email": "imnishantsrivastav@gmail.com",
            "phone": "9968439443",
            "__v": 0
        }
    ],
    "message": "User list fetched successfully",
    "code": 200
}

# save product api
url:
localhost:3000/product

method:
post

request:
{
	"name":"product_two",
	"price":"100"
}

response:
{
    "data": null,
    "message": "Product saved successfully",
    "code": 200
}

# get product list api
url:
localhost:3000/product/list

method:
get

response:
{
    "data": [
        {
            "name": "product_one",
            "price": "100",
            "addedOn": 1540123362129,
            "modifiedOn": 1540123362129,
            "isActive": 1,
            "isDeleted": 0,
            "_id": "5bcc6ae26759e419049a5299",
            "__v": 0
        },
        {
            "name": "product_two",
            "price": "100",
            "addedOn": 1540127601138,
            "modifiedOn": 1540127601138,
            "isActive": 1,
            "isDeleted": 0,
            "_id": "5bcc7b71b560731784678f81",
            "__v": 0
        }
    ],
    "message": "Product list fetched successfully",
    "code": 200
}

# save order api
url:
localhost:3000/order

method:
post

request:
{
	"product":"5bcc6ae26759e419049a5299",
	"consumer": "5bcc68356135c102bce55f48"
}

response:
{
    "data": null,
    "message": "Order saved successfully",
    "code": 200
}

# get order list api
url:
localhost:3000/order/list

method:
get

response:
{
    "data": [
        {
            "status": "placed",
            "addedOn": 1540133883547,
            "modifiedOn": 1540133883547,
            "isActive": 1,
            "isDeleted": 0,
            "_id": "5bcc93fb74f03f1550eaa52a",
            "product": "5bcc6ae26759e419049a5299",
            "consumer": "5bcc68356135c102bce55f48",
            "agent": "5bcc7ae6b560731784678f80",
            "__v": 0
        }
    ],
    "message": "Order list fetched successfully",
    "code": 200
}
