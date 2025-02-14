const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 10,
  blockDuration: 60,
});


module.exports = rateLimiter