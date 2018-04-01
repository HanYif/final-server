const Router = require('koa-router')

let job = new Router()
const jobController = require('../controllers/jobController.js')

jobController(job)

module.exports = job
