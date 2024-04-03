const {fetchStatesService,fetchOptionService} = require("../../services/EmployeeServices/supportService");
const { 
        fetchEmployeeService,
        fetchEmployeeEducationService,
        fetchEmployeeLanguageService,
        fetchEmployeeTechService,
        fetchEmployeeWorkService,
        fetchEmployeeReferService,
        fetchEmployeePreferService
    } = require("../../services/EmployeeServices/fetchEmployeeService");

const AjaxEmployeeDetailsUpdatePage = async(req,res) => {
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
    
    }catch(err){
      console.log(err);
    }  
}

module.exports = {AjaxEmployeeDetailsUpdatePage};