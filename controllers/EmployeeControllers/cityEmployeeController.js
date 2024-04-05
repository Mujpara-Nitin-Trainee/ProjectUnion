const logger = require('../../middlewares/logger');
const {fetchCitiesService} = require("../../services/EmployeeServices/supportService");

const cities = async (req, res) => {
    try {
      let state = req.query.state;
  
      const [cities] = await fetchCitiesService(state);
  
      res.json(cities);
    } catch (err) {
      logger.error("Unable to fetch data:- " + err);
      console.log(err);
    }
};

module.exports = {cities};