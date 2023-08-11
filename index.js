const axios = require('axios');

exports.handler = async (event) => {
    try {
        const agents = require('./agents');
        let url = event.url || event.queryStringParameters.url;
        
        if(url){
            url = decodeURIComponent(url);
            
            const res = await axios.get(url, {
                'User-Agent': agents[Math.floor(Math.random() * agents.length)]
            });
    
            return {
                statusCode: 200,
                body: JSON.stringify({ contents: res.data })
            };   
        }
        else{
            return {
                statusCode: 400,
                body: "Invalid url"
            };
        }
    } catch (e) {
        console.log(e);
        
        return {
            statusCode: 400,
            body: JSON.stringify(e)
        };
    }
};