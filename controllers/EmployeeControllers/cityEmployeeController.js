const {} = require("../../services/employeeService");

const cities = async (req, res) => {
    try {
      let state = req.query.state;
  
      const [cities] = await citiesService(state);
  
      res.json(cities);
    } catch (err) {
      console.log(err);
    }
};

module.exports = {cities};