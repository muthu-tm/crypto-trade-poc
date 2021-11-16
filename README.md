# crypto-trade-poc

### Setup
  - $ npm i
  - $ npm start


### API Endpoints:

 - GET /crypto/wallet
    * Resp: {
          "walletAmount": 10000,
          "currency": "USD",
          "etherBalance": 0
        }

 - GET /crypto/eth/balance
    * Resp: {
          "ethereum": {
            "usd": 4361.3
          }
        }

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
