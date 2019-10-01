const express = require('express');
const symbols = express();
const axios = require('axios');

const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=ew&interval=5min&apikey=UUH5819YQ2VPHIN0`

const getSymbol = async (symbol) => {
    try{
        let { data } = axios.get(apiUrl+symbol);
        if (data[`Error Message`]) return false;
        else{
            return Object.values(data["Time Series (Daily)"])[0];
        }
    } catch (error){
        console.log(error);
    }
}

symbols.get('/:symbol',(req,res,next) => {
    let symbol = req.params.symbol;
    if (req.params.symbol){
        let symbolData = getSymbol(symbol);
        res.send(symbolData);
    }else{
        res.status(404).send();
    }
}

)