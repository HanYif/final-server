// 监测 token 是否过期 TODO
// const jwt = require('jsonwebtoken')

module.exports = (ctx, next) => {
  ctx.token = {
    success: true,
    token: true
  }
  next()
}
