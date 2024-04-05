const db = require("../../config/config");
const logger = require('../../middlewares/logger');

const employeeRegisterService = async (body,lang,capability,tech,level,company_name) => {
    try {
      let employeeDetails = `Insert into Employee_Master(firstname,lastname,email,mobileno,gender,dob,address,city,state,zipcode,relation_status) values (?,?,?,?,?,?,?,?,?,?,?)`;
      let employeeValues = [
        body.firstname,
        body.lastname,
        body.email,
        body.mobileno,
        body.gender,
        body.dob,
        body.address,
        body.city,
        body.state,
        body.zipcode,
        body.relation,
      ];  
  
      const resultId = await db.execute( employeeDetails, employeeValues,
        (err, res) => {
          if (err) throw err;
          return res;
        }
      );
  
      let d = 0;
      if(typeof(body.degree) != "string"){
        try{
          body.degree.map((e) => { 
  
              let employeeEducation = `Insert into Education_Master(eid,degree,board,year,percentage) values (?,?,?,?,?)`;
              let educationValue = [resultId[0].insertId, body.degree[d], body.board[d], body.year[d], body.percentage[d]];
  
              const result = db.execute(
                employeeEducation,
                educationValue,
                (err, res) => {
                  if (err) throw err;
                  return res;
                }
              );
              d++;
  
          })
        }catch(err){
          logger.error("can't execute :- " + err);
        }
      }else{
        let employeeEducation = `Insert into Education_Master(eid,degree,board,year,percentage) values (?,?,?,?,?)`;
        let educationValue = [resultId[0].insertId, body.degree, body.board, body.year, body.percentage];
  
        const result = await db.execute(
          employeeEducation,
          educationValue,
          (err, res) => {
            if (err) throw err;
            return res;
          }
        );
      }
  
      let l = 0;
      if(typeof(lang) != "string"){
          lang[0].map((e) => {
            try {
              let employeeLanguage = `Insert into Employee_language_Master(eid,lang_name,lang_capability) values (?,?,?)`;
              let languageValues = [resultId[0].insertId, e, capability[l]];

              const result = db.execute(
                employeeLanguage,
                languageValues,
                (err, res) => {
                  if (err) throw err;
                  return res;
                }
              );
              l++;
  
            } catch (err) {
              logger.error("can't execute:- " + err);
            }
          })
      }else{
        try {
          let employeeLanguage = `Insert into Employee_language_Master(eid,lang_name,lang_capability) values (?,?,?)`;
          let languageValues = [resultId[0].insertId, lang, capability];
      
          const result = db.execute(
            employeeLanguage,
            languageValues,
            (err, res) => {
              if (err) throw err;
              return res;
            }
          );
        } catch (err) {
          logger.error("can't execute :- "+err);
        }
      }
      
      let t=0;
      if(typeof(tech) != "string"){
          tech[0].map((e) => { 
            try {
              let employeeTech = `Insert into Employee_Tech_Master(eid,tech_name,tech_capability) values (?,?,?)`;
              let techValues = [resultId[0].insertId, e, level[t]];
          
              const result = db.execute(employeeTech, techValues, (err, res) => {
                if (err) throw err;
                return res;
              });
              t++;
            } catch (err) {
              logger.error("can't execute:- " + err);
            }
          })
      }else{
        try {
          let employeeTech = `Insert into Employee_Tech_Master(eid,tech_name,tech_capability) values (?,?,?)`;
          let techValues = [resultId[0].insertId, tech[0], level];
      
          const result = db.execute(employeeTech, techValues, (err, res) => {
            if (err) throw err;
            return res;
          });
        } catch (err) {
          logger.error("can't execute:- " + err);
        }
      }
  
    if(typeof(company_name) != "string"){
      for(let i=0; i < company_name.length; i++){
        try {
          let company = company_name[i];
          let employeeCompany = `Insert into Work_experience_master(eid,company_name,designation,startdate,enddate) values (?,?,?,?,?)`;
          let companyValue = [resultId[0].insertId, company, body.designation[i], body.start_date[i], body.end_date[i]];
  
          const result = db.execute(
            employeeCompany,
            companyValue,
            (err, res) => {
              if (err) throw err;
              return res;
            }
          );
        } catch (err) {
          logger.error("can't execute:- " + err);
        }
      }
    }else{
      try {
        let employeeCompany = `Insert into Work_experience_master(eid,company_name,designation,startdate,enddate) values (?,?,?,?,?)`;
        let companyValue = [resultId[0].insertId, body.company_name, body.designation, body.startdate, body.enddate];
    
        const result = await db.execute(
          employeeCompany,
          companyValue,
          (err, res) => {
            if (err) throw err;
            return res;
          }
        );
        return result;
      } catch (err) {
        logger.error("can't execute:- " + err);
      }
    }
  
    try {
      let employeeRefer = `Insert into Reference_Master(eid,refer_name,refer_contact,refer_relation) values (?,?,?,?)`;
      let referValue = [resultId[0].insertId, body.name, body.contactno, body.relationship];
  
      const result = await db.execute(employeeRefer, referValue, (err, res) => {
        if (err) throw err;
        return res;
      });
    } catch (err) {
      logger.error("can't execute:- " + err);
    }
  
    if(typeof(body.location) != "string"){
  
      body.location.map((e) => {
        try {
          let employeePrefer = `Insert into Prefrerance_Master(eid,location,noticeperiod,expected_ctc,current_ctc,department) values (?,?,?,?,?,?)`;
          let preferValue = [
            resultId[0].insertId,
            e,
            body.noticeperiod,
            body.expacted_ctc,
            body.current_ctc,
            body.department
          ];
      
          const result = db.execute(employeePrefer, preferValue, (err, res) => {
            if (err) throw err;
            return res;
          });
        } catch (err) {
          logger.error("can't execute:- " + err);
        }
      })
  
    }else{
      try {
        let employeePrefer = `Insert into Prefrerance_Master(eid,location,noticeperiod,expected_ctc,current_ctc,department) values (?,?,?,?,?,?)`;
        let preferValue = [
          resultId[0].insertId,
          body.location,
          body.noticeperiod,
          body.expacted_ctc,
          body.current_ctc,
          body.department
        ];
    
        const result = await db.execute(employeePrefer, preferValue, (err, res) => {
          if (err) throw err;
          return res;
        });
      } catch (err) {
        logger.error("can't execute:- " + err);
      }
    }
  
      return resultId;
  
    } catch (err) {
      logger.error("can't fetch data:- " + err);
    }
};

module.exports = {employeeRegisterService};