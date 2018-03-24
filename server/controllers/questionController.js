const Questions = require('../models/questions')

const GetQuestions = async (ctx, next) => {
  let options = ctx.query
  console.log('opts', options)
  let result = {
    success: false,
    message: '',
    data: null
  }
  await Questions.find(options)
    .then(questions => {
      console.log('questions', questions)
      result.success = true
      result.data = questions
      result.message = '查询成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

const CreateQuestion = async (ctx, next) => {
  let model = ctx.request.body
  let result = {
    success: false,
    message: '',
    data: null
  }
  await Questions.create(model)
    .then(question => {
      console.log('c question', question)
      result.success = true
      result.data = question
      result.message = '插入成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

const DeleteQuestionById = async (ctx, next) => {
  let result = {
    success: false,
    message: '',
    data: null
  }
  let questionId = ctx.request.body.questionId
  await Questions.deleteByQuestionId(questionId)
    .then(question => {
      console.log('d question', question)
      result.success = true
      result.data = question
      result.message = '删除成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

const UpdateQuestionById = async (ctx, next) => {
  let result = {
    success: false,
    message: '',
    data: null
  }

  ctx.request.body.id = parseInt(ctx.request.body.id)
  let values = ctx.request.body
  await Questions.updateByQuestionId(ctx.request.body.id, values)
    .then(question => {
      console.log('d question', question)
      result.success = true
      result.data = question
      result.message = '更新成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

module.exports = (router) => {
  router.get('/questions/getQuestions', GetQuestions),
  router.post('/questions/createQuestion', CreateQuestion),
  router.post('/questions/deleteQuestionById', DeleteQuestionById)
  router.post('/questions/updateQuestionById', UpdateQuestionById)
}
