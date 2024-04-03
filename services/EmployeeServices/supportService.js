const db = require('../../config/config');

const fetchStatesService = async () => {
    try {
      let selectState = `select * from states_master`;
      let values = [];
  
      const result = await db.execute(selectState, values, (err, res) => {
        if (err) throw err;
        return res;
      });
      return result;
    } catch (err) {
      console.log(err);
    }
};
  
const fetchOptionService = async () => {
    try {
      let selectOptions = `select * from select_master left join option_master on select_master.id = option_master.sid;`;
      let values = [];
  
      const result = await db.execute(selectOptions, values, (err, res) => {
        if (err) throw err;
        return res;
      });
  
      return result;
    } catch (err) {
      console.log(err);
    }
};
  
const fetchCitiesService = async (body) => {
    try {
      let cities = `select * from city_master where sid = ?`;
      let value = [body];
  
      const result = await db.execute(cities, value, (err, res) => {
        if (err) throw err;
        return res;
      });
  
      return result;
    } catch (err) {
      console.log(err);
    }
};
  
module.exports = {fetchStatesService,fetchOptionService,fetchCitiesService}