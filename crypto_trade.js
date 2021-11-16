const express = require('express'),
    router = express.Router();

const price_utils = require('./price_utils');

router.get('/wallet', async function (req, res) {
    try {
        return res.status(200).json(price_utils.getWalletDetails());
    } catch (err) {
        return res.status(500).json({ error_message: "Unable to fetch your wallet data now!" });
    }
});

router.get('/eth/balance', async function (req, res) {
    try {
        let eth_info = await price_utils.getEtherBalance()
        return res.status(200).json(eth_info);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error_message: "Unable to fetch Ethereum details now!" });
    }
});

router.post('/buy', async function (req, res) {
    // let { quantity, price } = req.body;
    try {
        price_utils.addBuyOrder(req.body);
        return res.status(200).json({ messgae: "Successfully Placed your BUY Order" });
    } catch (err) {
        return res.status(500).json({ messgae: "Unable to place BUY Order now!" });
    }
});

router.post('/sell', async function (req, res) {
    // let { quantity, price } = req.body;
    try {
        price_utils.addSellOrder(req.body);
        return res.status(200).json({ messgae: "Successfully Placed your SELL Order" });
    } catch (err) {
        return res.status(500).json({ messgae: "Unable to place SELL Order now!" });
    }
});

module.exports = router;