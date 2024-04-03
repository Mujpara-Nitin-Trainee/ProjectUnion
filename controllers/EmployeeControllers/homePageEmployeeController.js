const {fetchStatesService,fetchOptionService} = require('../../services/EmployeeServices/supportService');

const jobApkAjaxHome = async (req,res) => {
    try{
  
      const [states] = await fetchStatesService();
      const [options] = await fetchOptionService();
  
      let relation = [];
      let lang = [];
      let lang_capability = [];
  
      let tech = [];
      let tech_capability = [];
  
      Object.keys(options).forEach((e) => {
        // console.log(result[e].select_name);
  
        if (options[e].select_name == "Relationship_Status") {
          relation.push(options[e].option_key);
        }
  
        if (options[e].select_name == "language_details") {
          lang.push(options[e].option_key);
        }
  
        if (options[e].select_name == "language_capability") {
          lang_capability.push(options[e].option_key);
        }
  
        if (options[e].select_name == "technology_details") {
          tech.push(options[e].option_key);
        }
  
        if (options[e].select_name == "technology_capability") {
          tech_capability.push(options[e].option_key);
        }
      });
  
      res.render("registerEmployeeCRUD", {
        states: states,
        relation,
        lang,
        lang_capability,
        tech,
        tech_capability,
      });
    } catch (err) {
      console.log(err);
    }
  
}

const jobApkCrudHome = async (req, res) => {
    try {
      const [states] = await fetchStatesService();
      const [options] = await fetchOptionService();
  
      let relation = [];
      let lang = [];
      let lang_capability = [];
  
      let tech = [];
      let tech_capability = [];
  
      Object.keys(options).forEach((e) => {
        // console.log(result[e].select_name);
  
        if (options[e].select_name == "Relationship_Status") {
          relation.push(options[e].option_key);
        }
  
        if (options[e].select_name == "language_details") {
          lang.push(options[e].option_key);
        }
  
        if (options[e].select_name == "language_capability") {
          lang_capability.push(options[e].option_key);
        }
  
        if (options[e].select_name == "technology_details") {
          tech.push(options[e].option_key);
        }
  
        if (options[e].select_name == "technology_capability") {
          tech_capability.push(options[e].option_key);
        }
      });
  
      res.render("registerEmployee", {
        states: states,
        relation,
        lang,
        lang_capability,
        tech,
        tech_capability,
      });
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = {jobApkAjaxHome,jobApkCrudHome}