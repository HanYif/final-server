const dbUtils = require('./../middlewares/db-util')

const Jobs = {
  /**
   * 创建提问
   * @param {object} model 提问数据
   */
  async create (model) {
    let result = await dbUtils.insertData('jobs', model)
    console.log('in finish')
    return result
  },
  
  /**
   * 查找提问
   * @param {object} options 分页查找条件参数
   */
  async find (options) {
    console.log('opt', options)
    options.pageSize = 10
    options.pageNum = options.pageNum ? parseInt(options.pageNum) : 1
    let startIndex = (options.pageNum - 1) * options.pageSize
    let sql = `SELECT * FROM jobs limit ${startIndex}, ${options.pageSize}`
    if (options.isHot) {
      let count = options.count ? options.count : 4
      sql = `SELECT * FROM jobs order by hot desc limit ${count}`
    }
    let result = await dbUtils.query(sql)
    if (Array.isArray(result) && result.length > 0) {
      return result
    } else {
      return null
    }
  },

  /**
   * 删除提问
   * @param {string} id
   */
  async deleteByJobId (jobId) {
    let result = await dbUtils.deleteDataById('jobs', jobId)
    if (Array.isArray(result) && result.length > 0) {
      return result
    } else {
      return null
    }
  },

  /**
   * 更新提问
   * @param {string} id
   */
  async updateByJobId (jobId, values) {
    let result = await dbUtils.updateData('jobs', values, jobId)
    if (Array.isArray(result) && result.length > 0) {
      return result
    } else {
      return null
    }
  }
}

module.exports = Jobs
