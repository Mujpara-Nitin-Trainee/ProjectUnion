
const {pageWithAllFilterService} = require("../../services/paggingService");

const pageWithAllFilter = async (req, res) => {
    try {
      const page = req.query.page || 1;
  
      const offset = (page - 1) * 20;
  
      const date = req.query.date || 0;
  
      let year;
      let month;
  
      if (date == 2) {
        month = 2;
        year = 2024;
      } else if (date == 1) {
        month = 1;
        year = 2024;
      } else if (date == 0) {
        month = 12;
        year = 2023;
      }
  
      const column = req.query.column || "student_id";
      const order = req.query.order || "asc";
  
      // console.log(order.trim());
  
      const [response] = await pageWithAllFilterService(
        month,
        year,
        column,
        order.trim(),
        offset
      );
      // console.log(response);
  
      res.render("allFilter", {
        student: response,
        rows: Object.keys(response[0]),
        page,
        order,
        column,
        date,
      });
    } catch (err) {
      console.log(err);
    }
};

module.exports = {pageWithAllFilter};