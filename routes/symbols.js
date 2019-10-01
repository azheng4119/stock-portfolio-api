const express = require('express');
const symbols = express();
const axios = require('axios');

// const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=ew&interval=5min&apikey=UUH5819YQ2VPHIN0`

const getSymbol = async (symbol) => {
    try{
        let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&interval=5min&apikey=UUH5819YQ2VPHIN0`
        console.log(url);
        let { data } = await axios.get(url);
        console.log(data);
        if (data[`Error Message`]) return "No Matching Symbol";
        else{
            return Object.values(data["Time Series (Daily)"])[0];
        }
    } catch (error){
        console.log(error);
    }
}

symbols.get('/:symbol',async (req,res,next) => {
    let symbol = req.params.symbol;
    if (symbol){
        let symbolData = await getSymbol(symbol);
        console.log(symbolData)
        res.json(symbolData);
    }else{
        res.status(404).send();
    }
}

)

module.exports = symbols