const express = require('express');
const symbols = express();
const axios = require('axios');

// const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=ew&interval=5min&apikey=UUH5819YQ2VPHIN0`
// const apiUrl = `https://api-v2.intrinio.com/securities/MSFT/prices/realtime?api_key=OjFhN2ViZWI2NzFhNDU3N2Q4NjMyMTQyYmNmZThlN2Uw`
const getSymbol = async (symbol) => {
    try{
        let url = `https://api-v2.intrinio.com/securities/${symbol.toUpperCase()}/prices/realtime?api_key=OjFhN2ViZWI2NzFhNDU3N2Q4NjMyMTQyYmNmZThlN2Uw`
        let { data } = await axios.get(url);
        return data;
    } catch (error){
        console.log(error);
    }
}

symbols.get('/:symbol',async (req,res,next) => {
    let symbol = req.params.symbol;
    if (symbol){
        let symbolData = await getSymbol(symbol);
        res.json(symbolData);
    }else{
        res.status(404).send();
    }
}

)

module.exports = symbols