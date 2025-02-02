const logger = require("../../middlewares/logger");
const {
  fetchStatesService,
  fetchOptionService,
} = require("../../services/EmployeeServices/supportService");

const jobApkAjaxHome = async (req, res) => {
  try {
    const [states] = await fetchStatesService();
    const [options] = await fetchOptionService();

    let relation = [];
    let lang = [];
    let lang_capability = [];

    let tech = [];
    let tech_capability = [];

    Object.keys(options).forEach((e) => {
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
      id: null,
      states: states,
      relation,
      lang,
      lang_capability,
      tech,
      tech_capability,
    });
  } catch (err) {
    logger.error("Unable to fetch data:- " + err);
  }
};

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
    logger.error("Unable to fetch data:- " + err);
  }
};

module.exports = { jobApkAjaxHome, jobApkCrudHome };
