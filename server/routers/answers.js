const Router = require('koa-router')

let answer = new Router()
const answerController = require('../controllers/answerController.js')

answerController(answer)

module.exports = answer
