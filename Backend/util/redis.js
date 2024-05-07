const redis = require('redis');

const redisClient = redis.createClient({
    host: 'localhost',
    port:6379,
})

redisClient.on("error", function(error){
    console.log(`Error: ${error}`);
})


redisClient.on('connect', function(){
    console.log("connected to redis");
})

module.exports = redisClient;