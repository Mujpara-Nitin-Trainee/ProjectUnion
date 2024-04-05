const logger = require("../../middlewares/logger");
const {paggingService,pageOrderbyService} = require("../../services/PaggingServices/pageOrderbyService");

const normalPagging = async (req, res) => {
    try {
      let page = req.query.page || 1;
      let offset = (page - 1) * 200;
  
      const [response] = await paggingService(offset);
  
      res.render("pagging", { students: response, page });

    } catch (err) {
      logger.error("Unable to get data:- " + err);
    }
};
  
const paggingOrderby = async (req, res) => {
    try {
      let order = req.query.order || "asc";
      let page = req.query.page || 1;
      let offset = (page - 1) * 200;
  
      const [response] = await pageOrderbyService(order, offset);
  
      res.render("orderby", { students: response, page, order });
      
    } catch (err) {
      logger.error("Unable To get Data:- " + err);
      console.log(err);
    }
};

module.exports = {normalPagging,paggingOrderby};