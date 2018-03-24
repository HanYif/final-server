const Router = require('koa-router')

let question = new Router()
const questionController = require('../controllers/questionController.js')

questionController(question)

module.exports = question
