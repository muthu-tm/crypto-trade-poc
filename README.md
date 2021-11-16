# crypto-trade-poc

### Setup
  - $ npm i
  - $ npm start


### API Endpoints:

 - GET /crypto/wallet
 - GET /crypto/eth/balance

Place Orders:
 - POST /crypto/buy
    * Body Params: {
        "quantity": 1,
        "price": 4260.68
      }
      
 - POST /crypto/sell
    * Body Params: {
        "quantity": 1,
        "price": 4260.68
      }
