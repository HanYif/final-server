const dbUtils = require('./../middlewares/db-util')

const Answers = {
  /**
   * 创建提问
   * @param {object} model 回答数据
   */
  async create (model) {
    let result = await dbUtils.insertData('answers', model)
    console.log('in finish')
    return result
  },
  
  /**
   * 查找回答
   * @param {object} options 分页查找条件参数
   */
  async find (options) {
    options.pageSize = 10
    options.pageNum = parseInt(options.pageNum)
    let startIndex = (options.pageNum - 1) * options.pageSize
    let sql = `SELECT * FROM answers WHERE question_id=${parseInt(options.questionId)} limit ${startIndex}, ${options.pageSize}`
    
    let result = await dbUtils.query(sql)
    if (Array.isArray(result) && result.length > 0) {
      return result
    } else {
      return null
    }
  },

  /**
   * 删除回答
   * @param {string} id
   */
  async deleteByAnswerId (answerId) {
    let result = await dbUtils.deleteDataById('answers', answerId)
    if (Array.isArray(result) && result.length > 0) {
      return result
    } else {
      return null
    }
  },

  /**
   * 更新回答
   * @param {string} id
   */
  async updateByAnswerId (answerId, values) {
    let result = await dbUtils.updateData('answers', values, answerId)
    if (Array.isArray(result) && result.length > 0) {
      return result
    } else {
      return null
    }
  }
}

module.exports = Answers
