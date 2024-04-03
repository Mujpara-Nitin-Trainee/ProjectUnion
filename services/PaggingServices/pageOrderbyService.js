const db = require("../../config/config");

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
      console.log(err);
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
      console.log(err);
    }
};

module.exports = {paggingService,pageOrderbyService};