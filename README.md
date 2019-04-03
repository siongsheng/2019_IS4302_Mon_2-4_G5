# IS4302
eCommerce Blockchain Solution

# Setup
Vagrant and Hyperledger Composer
* Clone this [repo](https://github.com/suenchunhui/easy-hyperledger-composer)
* Append this line to the bottom of Vagrantfile to open an additional port for composer REST server  
`config.vm.network :forwarded_port, guest: 3004, host: 3004`
* Follow the repo's setup instructions
* Once composer playground is started, open [http://localhost:8080](http://localhost:8080) and deploy a new business network
* Import DeliverLor.bna file
* For credentials, use ID and Secret and set Enrollment ID as `admin` and Enrollment Secret as `adminpw`

Populate assets
```
{
  "$class": "org.deliverlor.ecommerce.Buyer",
  "Id": "buyer1",
  "name": "John Doe",
  "email": "buyer1@test.com",
  "contactNum": "111111",
  "address": {
    "$class": "org.deliverlor.ecommerce.Address",
    "houseNo": "B1",
    "street": "Yellow avenue",
    "county": "nil",
    "postcode": "222222",
    "country": "Singapore"
  },
  "wallet": "resource:org.deliverlor.ecommerce.Wallet#wallet1"
}

{
  "$class": "org.deliverlor.ecommerce.Buyer",
  "Id": "buyer2",
  "name": "Laboris velit.",
  "email": "buyer2@test.com",
  "contactNum": "123",
  "address": {
    "$class": "org.deliverlor.ecommerce.Address",
    "houseNo": "1",
    "street": "Est id reprehenderit veniam labore.",
    "county": "Sit.",
    "postcode": "2",
    "country": "Enim ut."
  },
  "wallet": "resource:org.deliverlor.ecommerce.Wallet#wallet2"
}

{
  "$class": "org.deliverlor.ecommerce.Logistics",
  "Id": "logs1",
  "name": "UPS",
  "email": "logs1@test.com",
  "contactNum": "55555555",
  "address": {
    "$class": "org.deliverlor.ecommerce.Address",
    "houseNo": "L1 ",
    "street": "Green avenue",
    "county": "nil",
    "postcode": "123456",
    "country": "Singapore"
  },
  "wallet": "resource:org.deliverlor.ecommerce.Wallet#wallet3"
}

{
  "$class": "org.deliverlor.ecommerce.Logistics",
  "Id": "logs2",
  "name": "Fedex",
  "email": "logs2@test.com",
  "contactNum": "22222222",
  "address": {
    "$class": "org.deliverlor.ecommerce.Address",
    "houseNo": "L2 ",
    "street": "Red avenue",
    "county": "nil",
    "postcode": "654321",
    "country": "Singapore"
  },
  "wallet": "resource:org.deliverlor.ecommerce.Wallet#wallet4"
}

{
  "$class": "org.deliverlor.ecommerce.Seller",
  "Id": "seller1",
  "name": "Value Buy",
  "email": "seller1@test.com",
  "contactNum": "333333",
  "address": {
    "$class": "org.deliverlor.ecommerce.Address",
    "houseNo": "S1 ",
    "street": "Brown avenue",
    "county": "nil",
    "postcode": "888888",
    "country": "Singapore"
  },
  "wallet": "resource:org.deliverlor.ecommerce.Wallet#wallet5"
}

{
  "$class": "org.deliverlor.ecommerce.Seller",
  "Id": "seller2",
  "name": "Consectetur Lorem irure.",
  "email": "seller2@email.com",
  "contactNum": "2123",
  "address": {
    "$class": "org.deliverlor.ecommerce.Address",
    "houseNo": "1",
    "street": "Aute.",
    "county": "Nulla.",
    "postcode": "12",
    "country": "Amet Lorem."
  },
  "wallet": "resource:org.deliverlor.ecommerce.Wallet#wallet6"
}

{
  "$class": "org.deliverlor.ecommerce.Product",
  "Id": "prod1",
  "name": "Backpack",
  "price": 60,
  "description": "Nulla reprehenderit sint.",
  "stock": 2,
  "seller": "resource:org.deliverlor.ecommerce.Seller#seller1"
}

{
  "$class": "org.deliverlor.ecommerce.Wallet",
  "Id": "wallet1",
  "balance": 100,
  "ccNumber": "1",
  "expireMonth": 10,
  "expireYear": 2120,
  "owner": "resource:org.deliverlor.ecommerce.Buyer#buyer1"
}

{
  "$class": "org.deliverlor.ecommerce.Wallet",
  "Id": "wallet2",
  "balance": 100,
  "ccNumber": "1",
  "expireMonth": 10,
  "expireYear": 2120,
  "owner": "resource:org.deliverlor.ecommerce.Buyer#buyer2"
}

{
  "$class": "org.deliverlor.ecommerce.Wallet",
  "Id": "wallet3",
  "balance": 100,
  "ccNumber": "1",
  "expireMonth": 10,
  "expireYear": 12120,
  "owner": "resource:org.deliverlor.ecommerce.Logistics#logs1"
}

{
  "$class": "org.deliverlor.ecommerce.Wallet",
  "Id": "wallet4",
  "balance": 100,
  "ccNumber": "1",
  "expireMonth": 10,
  "expireYear": 12120,
  "owner": "resource:org.deliverlor.ecommerce.Logistics#logs2"
}

{
  "$class": "org.deliverlor.ecommerce.Wallet",
  "Id": "wallet5",
  "balance": 100,
  "ccNumber": "1",
  "expireMonth": 10,
  "expireYear": 2120,
  "owner": "resource:org.deliverlor.ecommerce.Seller#seller1"
}

{
  "$class": "org.deliverlor.ecommerce.Wallet",
  "Id": "wallet6",
  "balance": 100,
  "ccNumber": "1",
  "expireMonth": 10,
  "expireYear": 2112,
  "owner": "resource:org.deliverlor.ecommerce.Seller#seller2"
}
```

* Issue new IDs for the participants in the ID registry
    * For ID names, use back the participant's ID
    * e.g. for participant **org.deliverlor.ecommerce.Buyer#buyer1**, set ID name as **buyer1** and business network card as **buyer1@ecommerce-network**
* Start composer servers for the participants

```
npm run start_rest-server buyer1@ecommerce-network 3001
npm run start_rest-server seller1@ecommerce-network 3002
npm run start_rest-server logs1@ecommerce-network 3003
npm run start_rest-server logs2@ecommerce-network 3004
```

Middleware
* Make sure [Node.js](https://nodejs.org/en/download/) is installed
* Navigate to server/src/ and start the Express.js server with `node server.js`

Frontend
* 