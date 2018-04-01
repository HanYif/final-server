const Jobs = require('../models/jobs')

const GetJobs = async (ctx, next) => {
  let options = ctx.query
  let result = {
    success: false,
    message: '',
    data: null
  }
  await Jobs.find(options)
    .then(jobs => {
      result.success = true
      result.data = jobs
      result.message = '查询成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

const CreateJob = async (ctx, next) => {
  let model = ctx.request.body
  let result = {
    success: false,
    message: '',
    data: null
  }
  await Jobs.create(model)
    .then(job => {
      result.success = true
      result.data = job
      result.message = '插入成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

const DeleteJobById = async (ctx, next) => {
  let result = {
    success: false,
    message: '',
    data: null
  }
  let jobId = ctx.request.body.jobId
  await Jobs.deleteByJobId(jobId)
    .then(job => {
      result.success = true
      result.data = job
      result.message = '删除成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

const UpdateJobById = async (ctx, next) => {
  let result = {
    success: false,
    message: '',
    data: null
  }

  ctx.request.body.id = parseInt(ctx.request.body.id)
  let values = ctx.request.body
  await Jobs.updateByJobId(ctx.request.body.id, values)
    .then(job => {
      result.success = true
      result.data = job
      result.message = '更新成功'
    }).catch(err => {
      ctx.body = err
    })
  ctx.body = result
}

module.exports = (router) => {
  router.get('/jobs/getJobs', GetJobs),
  router.post('/jobs/createJob', CreateJob),
  router.post('/jobs/deleteJobById', DeleteJobById)
  router.post('/jobs/updateJobById', UpdateJobById)
}
