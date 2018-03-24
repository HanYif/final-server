const Answers = require('../models/answers')

const GetAnswers = async (ctx, next) => {
  let options = ctx.query
  console.log('opts', options)
  let result = {
    success: false,
    message: '',
    data: null
  }
  await Answers.find(options)
    .then(answers => {
      console.log('answers', answers)
      result.success = true
      result.data = answers
      result.message = '查询成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

const CreateAnswer = async (ctx, next) => {
  let model = ctx.request.body
  let result = {
    success: false,
    message: '',
    data: null
  }
  await Answers.create(model)
    .then(answer => {
      console.log('c answer', answer)
      result.success = true
      result.data = answer
      result.message = '插入成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

const DeleteAnswerById = async (ctx, next) => {
  let result = {
    success: false,
    message: '',
    data: null
  }
  let answerId = ctx.request.body.answerId
  await Answers.deleteByAnswerId(answerId)
    .then(answer => {
      console.log('d answer', answer)
      result.success = true
      result.data = answer
      result.message = '删除成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

const UpdateAnswerById = async (ctx, next) => {
  let result = {
    success: false,
    message: '',
    data: null
  }

  ctx.request.body.id = parseInt(ctx.request.body.id)
  let values = ctx.request.body
  await Answers.updateByAnswerId(ctx.request.body.id, values)
    .then(answer => {
      console.log('d answer', answer)
      result.success = true
      result.data = answer
      result.message = '更新成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

module.exports = (router) => {
  router.get('/answers/getAnswers', GetAnswers),
  router.post('/answers/createAnswer', CreateAnswer),
  router.post('/answers/deleteAnswerById', DeleteAnswerById)
  router.post('/answers/updateAnswerById', UpdateAnswerById)
}
