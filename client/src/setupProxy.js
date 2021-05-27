const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', { target: 'http://localhost:4000' })) // step 59 change localhost number to backend server address, add backend routers to distinguish between what is a front end route and backend route so we need to add /api to index.js of backend
}
