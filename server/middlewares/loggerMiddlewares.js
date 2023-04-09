class loggerMiddlewares {
  requestTime(req, res, next) {
    var date = new Date()
    req.requestTime = date
    next()
  }
  logger(req, res, next) {
    console.log(`Req.time: ${req.requestTime.toString() }\n url: ${req.url}`)
    next()
  }
}

module.exports = new loggerMiddlewares()