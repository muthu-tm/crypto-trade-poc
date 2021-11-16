# crypto-trade-poc

### Setup
  - $ npm i
  - $ npm start


### API Endpoints:

 - GET /crypto/wallet
    * Resp: {
          "ethereum": {
            "usd": 4361.3
          }
        }
 - GET /crypto/eth/balance
    * Resp: {
          "walletAmount": 10000,
          "currency": "USD",
          "etherBalance": 0
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
