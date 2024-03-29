const {
  fetchStatesService,
  fetchOptionService,
  citiesService,
  employeeRegisterService,
  employeeService,
  fetchEmployeeService,
  fetchEmployeeEducationService,
  fetchEmployeeLanguageService,
  fetchEmployeeTechService,
  fetchEmployeeWorkService,
  fetchEmployeeReferService,
  fetchEmployeePreferService,
  employeeUpdateService
} = require("../services/employeeService");

const jobApkHome = async (req, res) => {
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

const cities = async (req, res) => {
  try {
    let state = req.query.state;

    const [cities] = await citiesService(state);

    res.json(cities);
  } catch (err) {
    console.log(err);
  }
};

const employeeRegister = async (req, res) => {
  try {

    let lang = [];
    lang.push(req.body.lang);

    let gujrati = req.body.gujrati;

    let hindi = req.body.hindi;

    let english = req.body.english;

    let tech = [];
    tech.push(req.body.tech);
    let php1 = req.body.php1;
    let mysql1 = req.body.mysql1;
    let oracle1 = req.body.oracle1;
    let laravel1 = req.body.laravel1;

    let company_name = req.body.company_name;

    let capability = [];


    lang[0].map((e) => {
      if (e != "" || e != undefined) {
        if (e == "gujrati") {
          if (gujrati != undefined) {
            gujrati = gujrati.toString();
            capability.push(gujrati);
          }
        }

        if (e == "english") {
          if (english != undefined) {
            english = english.toString();
            capability.push(english);
          }
        }

        if (e == "hindi") {
          if (hindi != undefined) {
            hindi = hindi.toString();
            capability.push(hindi);
          }
        }
      }
    });

    let level = [];

    tech[0].map((e) => {
      if (e != "" || e != undefined) {
        if (e == "php") {
          if (php1 != undefined) {
            level.push(php1);
          }
        }

        if (e == "mysql") {
          if (mysql1 != undefined) {
            level.push(mysql1);
          }
        }

        if (e == "laravel") {
          if (laravel1 != undefined) {
            level.push(laravel1);
          }
        }

        if (e == "oracle") {
          if (oracle1 != undefined) {
            level.push(oracle1);
          }
        }
      }
    });

    // console.log(req.body)

    const [employeeResponse] = await employeeRegisterService(req.body,lang,capability,tech,level,company_name);

  } catch (err) {
    console.log(err);
  }
};

const employees = async (req,res) => {

  const [response] = await employeeService();

  res.render('employeeList',{employee:response,rows:Object.keys(response[0])});

}

const employeeDetails = async(req,res) => {

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

    const [basic] = await fetchEmployeeService(req.body);
    const [education] = await fetchEmployeeEducationService(req.body);
    const [langauge] = await fetchEmployeeLanguageService(req.body);
    const [technology] = await fetchEmployeeTechService(req.body);
    const [workExp] = await fetchEmployeeWorkService(req.body);
    const [refer] = await fetchEmployeeReferService(req.body);
    const [prefer] = await fetchEmployeePreferService(req.body);

    // console.log(basic);
    // console.log(education);
    // console.log(langauge);
    // console.log(technology);
    // console.log(workExp);
    // console.log(refer);
    // console.log(prefer);

    let lang_checked = [];
        let langcap_checked = [];

        lang = lang.map(item => item.toLowerCase());
        lang_checked = lang.map(item => langauge.some(lang_obj => lang_obj.lang_name === item) ? 1 : 0);

        // Employee's Language Capability
        let lang_cap = langauge.map(item => item.lang_capability.split(","));
        let emp_lang_cap = [];

        for (let i = 0; i < lang_cap.length; i++) {
            for (let j = 0; j < lang_cap[i].length; j++) {
                emp_lang_cap.push(lang_cap[i][j]);
            }
        }

        let lang_capa = [];

        for (let i = 0; i < lang_capability.length * (langauge.length); i++) {
            lang_capa.push(lang_capability[i % 3]);
        }

        // console.log(lang_capa);
        // console.log(emp_lang_cap);

        let j = 0;
        for (let i = 0; i < lang_capa.length; i++) {
            if (lang_capa[i] === emp_lang_cap[j]) {
                // console.log(1);
                langcap_checked.push(1);
                j++;
            } else {
                langcap_checked.push(0);
                // console.log(0);
            }
        }
        // console.log(langcap_checked);
        let answer_langcapability = [];

        while (langcap_checked.length) answer_langcapability.push(langcap_checked.splice(0, 3));
        // console.log(answer_langcapability);

        // console.log(tech);
        // Employee's Tech Checked
        let tech_checked = [];
        let tech_cap_checked = [];

        tech_checked = tech.map(item => technology.some(lang_obj => lang_obj.tech_name === (item).toLowerCase()) ? 1 : 0);
        // console.log(tech_checked);

        let t = 0;
        for (let i = 0; i < tech.length; i++) {
            // console.log(t);
                if ((tech[i]).toLowerCase() === technology[t].tech_name) {
                    // console.log(tech_emp[t].tech_capability);
                        tech_cap_checked.push(technology[t].tech_capability);
                } else {
                    tech_cap_checked.push("");
                    // console.log(0);
                }
        }

        // console.log(tech_cap_checked);
        // console.log(tech_emp);
        // console.log(basic[0].firstname);

        let id = req.body.id;

        res.render('updateEmployee',{employee:basic,states: states,id,
          relation, lang, lang_capability, tech, tech_capability,education,
          language: langauge, lang_checked, tech_checked,answer_langcapability, 
          tech_cap_checked, lang, lang_capability, tech, tech_capability,work: workExp, 
          refer: refer, prefer: prefer
        });

    // res.render('registerEmployee',
    // {employee:basic[0],education:education,states,relation,language: langauge, lang_checked, tech_checked, 
    //   answer_langcapability, tech_cap_checked, lang, lang_capability, tech, tech_capability,
    //   work: workExp, refer: refer, prefer: prefer})


  }catch(err){
    console.log(err);
  }

}

const employeeUpdate = async(req,res) => {

  try{

    let lang = [];
    lang.push(req.body.lang);

    let gujrati = req.body.gujrati;

    let hindi = req.body.hindi;

    let english = req.body.english;

    let tech = [];
    tech.push(req.body.tech);
    let php1 = req.body.php1;
    let mysql1 = req.body.mysql1;
    let oracle1 = req.body.oracle1;
    let laravel1 = req.body.laravel1;

    let company_name = req.body.company_name;

    let capability = [];


    lang[0].map((e) => {
      if (e != "" || e != undefined) {
        if (e == "gujrati") {
          if (gujrati != undefined) {
            gujrati = gujrati.toString();
            capability.push(gujrati);
          }
        }

        if (e == "english") {
          if (english != undefined) {
            english = english.toString();
            capability.push(english);
          }
        }

        if (e == "hindi") {
          if (hindi != undefined) {
            hindi = hindi.toString();
            capability.push(hindi);
          }
        }
      }
    });

    let level = [];

    tech[0].map((e) => {
      if (e != "" || e != undefined) {
        if (e == "php") {
          if (php1 != undefined) {
            level.push(php1);
          }
        }

        if (e == "mysql") {
          if (mysql1 != undefined) {
            level.push(mysql1);
          }
        }

        if (e == "laravel") {
          if (laravel1 != undefined) {
            level.push(laravel1);
          }
        }

        if (e == "oracle") {
          if (oracle1 != undefined) {
            level.push(oracle1);
          }
        }
      }
    });

    // console.log(req.body);

    const [response] = await employeeUpdateService(req.body,lang,capability,tech,level,company_name);

    console.log(response);

  }catch(err){
    console.log(err);
  }

}

module.exports = { jobApkHome, cities, employeeRegister,employees,employeeDetails,employeeUpdate };
