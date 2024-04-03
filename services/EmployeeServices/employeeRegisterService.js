const db = require("../../config/config");

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
  
      // console.log(employeeValues);
  
      const resultId = await db.execute( employeeDetails, employeeValues,
        (err, res) => {
          if (err) throw err;
          return res;
        }
      );
  
      // console.log(resultId[0].insertId);
  
      let d = 0;
      if(typeof(body.degree) != "string"){
        try{
          body.degree.map((e) => { 
  
              let employeeEducation = `Insert into Education_Master(eid,degree,board,year,percentage) values (?,?,?,?,?)`;
              let educationValue = [resultId[0].insertId, body.degree[d], body.board[d], body.year[d], body.percentage[d]];
  
              // console.log(educationValue);
  
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
          console.log(err);
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
  
              // console.log(languageValues);
  
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
              console.log(err);
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
          console.log(err);
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
              console.log(err);
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
          console.log(err);
        }
      }
  
    if(typeof(company_name) != "string"){
      for(let i=0; i < company_name.length; i++){
        try {
          let company = company_name[i];
          // console.log(body.designation[1]);
          let employeeCompany = `Insert into Work_experience_master(eid,company_name,designation,startdate,enddate) values (?,?,?,?,?)`;
          let companyValue = [resultId[0].insertId, company, body.designation[i], body.start_date[i], body.end_date[i]];
  
          // console.log(companyValue);
  
          const result = db.execute(
            employeeCompany,
            companyValue,
            (err, res) => {
              if (err) throw err;
              return res;
            }
          );
        } catch (err) {
          console.log(err);
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
        console.log(err);
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
      console.log(err);
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
          console.log(err);
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
        console.log(err);
      }
    }
  
      return resultId;
  
    } catch (err) {
      console.log(err);
    }
};

module.exports = {employeeRegisterService};