const {fetchCitiesService} = require("../../services/EmployeeServices/supportService");

const cities = async (req, res) => {
    try {
      let state = req.query.state;
  
      const [cities] = await fetchCitiesService(state);
  
      res.json(cities);
    } catch (err) {
      console.log(err);
    }
};

module.exports = {cities};