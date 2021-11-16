const EventEmitter = require('events')
let axios = require('axios');

var priceEvent = new EventEmitter()

var walletAmount = 10000
var availableEther = 0

var sellOrders = {}
var buyOrders = {}

priceEvent.on('change', function (obj) {
    console.log(obj)

    if (obj.ethereum.usd in sellOrders) {
        // SELL Order matched with market price
        let order = sellOrders[obj.ethereum.usd]

        if (order.quantity > availableEther) {
            sellOrders[obj.ethereum.usd].status = "Failed"
            sellOrders[obj.ethereum.usd].reason = "Not_Enough_Balance"
            console.log("Not Enough Balance - ", sellOrders[obj.ethereum.usd])
        } else {
            walletAmount = walletAmount + (order.quantity * order.price)
            sellOrders[obj.ethereum.usd].status = "Success"
            console.log("SELL Order success - ", sellOrders[obj.ethereum.usd])
            availableEther = availableEther - order.quantity
        }

        // remove key to avoid matching again
        delete sellOrders[obj.ethereum.usd]
    }

    if (obj.ethereum.usd in buyOrders) {
        // BUY Order matched with market price
        let order = buyOrders[obj.ethereum.usd]
        let buyAmount = order.quantity * order.price

        if (buyAmount > walletAmount) {
            buyOrders[obj.ethereum.usd].status = "Failed"
            buyOrders[obj.ethereum.usd].reason = "Not_Enough_Balance"
            console.log("Not Enough Balance - ", buyOrders[obj.ethereum.usd])

        } else {
            walletAmount = walletAmount - buyAmount;
            buyOrders[obj.ethereum.usd].status = "Success"
            availableEther = order.quantity
            console.log("BUY Order success - ", walletAmount)
        }
        
        // remove key to avoid matching again
        delete buyOrders[obj.ethereum.usd]
    }
})

function getWalletDetails() {
    return { "walletAmount": walletAmount, "currency": "USD", "etherBalance": availableEther };
}

async function getEtherBalance() {
    let response = await axios({
        method: 'get',
        headers: {
            accept: 'application/json',
        },
        params: {
            ids: "ethereum",
            vs_currencies: "usd"
        },
        url: `https://api.coingecko.com/api/v3/simple/price`
    });

    return response.data;
}

function addSellOrder(obj) {
    try {
        sellOrders[obj.price] = obj

        console.log(sellOrders)
    } catch (err) {
        console.error(err)
        throw err;
    }
}

function addBuyOrder(obj) {
    try {
        buyOrders[obj.price] = obj

        console.log(buyOrders)
    } catch (err) {
        console.error(err)
        throw err;
    }
}

// start to listen for the price changes; currently in 1.2s interval as the API has a rate limit of 50 calls/minute
setInterval(async () => {
    let response = await axios({
        method: 'get',
        headers: {
            accept: 'application/json',
        },
        params: {
            ids: "ethereum",
            vs_currencies: "usd"
        },
        url: `https://api.coingecko.com/api/v3/simple/price`
    });

    priceEvent.emit('change', response.data)
}, 1200);


module.exports = {
    getWalletDetails,
    getEtherBalance,
    addSellOrder,
    addBuyOrder
}