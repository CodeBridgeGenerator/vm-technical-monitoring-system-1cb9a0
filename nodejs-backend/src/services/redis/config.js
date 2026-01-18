const IORedis = require("ioredis");
const redisClient = new IORedis({
  maxRetriesPerRequest: null,
  // enable for docker composer
  // host: "redis",
  // port: 6379,
  //   password: null,
  //   tls: {
  //   ca: fs.readFileSync('LOCAL/PATH/TO/rackspace-ca-2016.pem')
  //   }
});

module.exports = redisClient;
