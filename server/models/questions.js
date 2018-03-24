const dbUtils = require('./../middlewares/db-util')

const Questions = {
  /**
   * 创建提问
   * @param {object} model 提问数据
   */
  async create (model) {
    let result = await dbUtils.insertData('questions', model)
    console.log('in finish')
    return result
  },
  
  /**
   * 查找提问
   * @param {object} options 分页查找条件参数
   */
  async find (options) {
    options.pageSize = 10
    options.pageNum = parseInt(options.pageNum)
    let startIndex = (options.pageNum - 1) * options.pageSize
    let sql = `SELECT * FROM questions WHERE status="${options.status}" limit ${startIndex}, ${options.pageSize}`
    
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
  async deleteByQuestionId (questionId) {
    let result = await dbUtils.deleteDataById('questions', questionId)
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
  async updateByQuestionId (questionId, values) {
    let result = await dbUtils.updateData('questions', values, questionId)
    if (Array.isArray(result) && result.length > 0) {
      return result
    } else {
      return null
    }
  }
}

module.exports = Questions
