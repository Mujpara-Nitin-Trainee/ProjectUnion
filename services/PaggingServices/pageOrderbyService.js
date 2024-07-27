const db = require("../../config/config");
const logger = require('../../middlewares/logger');

const paggingService = async (offset) => {
    try {
      let pages = `select * from student_master LIMIT ? OFFSET ?`;
      let pages_Value = ["200", offset.toString()];
  
      const result = await db.execute(pages, pages_Value, (err, res) => {
        if (err) throw err;
        return res;
      });
  
      return result;
    } catch (err) {
      logger.error("can't execute:- " + err);
    }
};
  
const pageOrderbyService = async (order, offset) => {
    try {
      let pageOrderby = `select * from student_master order by name ${order} limit ? offset ?`;
      let pageOrderbyValue = ["200", offset.toString()];
  
      const result = await db.execute(
        pageOrderby,
        pageOrderbyValue,
        (err, res) => {
          if (err) throw err;
          return res;
        }
      );
      return result;
    } catch (err) {
      logger.error("can't execute:- " + err);
    }
};

module.exports = {paggingService,pageOrderbyService};