const {paggingService,pageOrderbyService} = require("../../services/PaggingServices/pageOrderbyService");

const normalPagging = async (req, res) => {
    try {
      let page = req.query.page || 1;
      let offset = (page - 1) * 200;
  
      const [response] = await paggingService(offset);
      // console.log(response);
  
      res.render("pagging", { students: response, page });
    } catch (err) {
      console.log(err);
    }
};
  
const paggingOrderby = async (req, res) => {
    try {
      let order = req.query.order || "asc";
      let page = req.query.page || 1;
      let offset = (page - 1) * 200;
  
      const [response] = await pageOrderbyService(order, offset);
      // console.log(response);
  
      res.render("orderby", { students: response, page, order });
    } catch (err) {
      console.log(err);
    }
};

module.exports = {normalPagging,paggingOrderby};