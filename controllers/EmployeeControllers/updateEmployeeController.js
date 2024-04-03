const {employeeUpdateService} = require("../../services/EmployeeServices/employeeUpdateService");

const employeeUpdate = async(req,res) => {

    try{
  
      console.log(req.body);
  
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
  
      if(response){
        res.redirect("/api/user/home");
      }
  
    }catch(err){
      console.log(err);
    }
  
}

module.exports = {employeeUpdate};