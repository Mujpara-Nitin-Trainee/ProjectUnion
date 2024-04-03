const db = require("../../config/config");

const employeeUpdateService = async(body,lang,capability,tech,level,company_name) => {
    try {
      let employeeDetails = `update Employee_Master set firstname = ?, lastname = ?, email = ?, mobileno = ?,
        gender = ?, dob = ?, address = ?, city = ?, state = ?, zipcode = ?, relation_status = ? where id = ?`;
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
        body.id
      ];
  
      // console.log(employeeValues);
  
      const basicUpdate = await db.execute( employeeDetails, employeeValues,
        (err, res) => {
          if (err) throw err;
          return res;
        }
      );
  
      let d = 0;
      if(typeof(body.degree) != "string"){
        try{
          body.degree.map((e) => { 
  
              let employeeEducation = `update Education_Master set degree = ?, board = ?, year = ?, percentage = ? where eid = ? and degree = '${body.degree[d]}'`;
              let educationValue = [body.degree[d], body.board[d], body.year[d], body.percentage[d],body.id];
  
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
        let employeeEducation = `update Education_Master set degree = ?, board = ?, year = ?, percentage = ? where eid = ? and degree = '${body.degree}'`;
        let educationValue = [body.degree, body.board, body.year, body.percentage,body.id];
  
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
              let employeeLanguage = `update Employee_language_Master set lang_name=?, lang_capability=? where eid = ? and lang_name = '${e}'`;
              let languageValues = [ e, capability[l],body.id];
  
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
          let employeeLanguage = `update Employee_language_Master set lang_name=?, lang_capability=? where eid = ? and lang_name = '${e}'`;
          let languageValues = [ lang, capability,body.id];
      
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
              let employeeTech = `update Employee_Tech_Master set tech_name = ?,tech_capability = ? where eid = ? and tech_name= '${e}'`;
              let techValues = [ e, level[t],body.id];
          
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
          let employeeTech = `update Employee_Tech_Master set tech_name = ?,tech_capability = ? where eid = ? and tech_name= '${tech[0]}'`;
          let techValues = [tech[0], level,body.id];
      
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
          let employeeCompany = `update  Work_experience_master set company_name=?,designation=?,startdate=?,enddate=? where eid = ? and designation = '${body.designation[i]}'`;
          let companyValue = [company, body.designation[i], body.start_date[i], body.end_date[i],body.id];
  
          console.log(companyValue);
  
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
        let employeeCompany = `update  Work_experience_master set company_name=?,designation=?,startdate=?,enddate=? where eid = ? and company_name = '${e}'`;
        let companyValue = [body.company_name, body.designation, body.start_date, body.end_date,body.id];
    
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
      let employeeRefer = `update  Reference_Master set refer_name = ?,refer_contact = ?,refer_relation = ? where eid = ?`;
      let referValue = [body.name, body.contactno, body.relationship,body.id];
  
      const result = await db.execute(employeeRefer, referValue, (err, res) => {
        if (err) throw err;
        return res;
      });
    } catch (err) {
      console.log(err);
    }
  
      body.location.map((e) => {
        try {
          let employeePrefer = `update Prefrerance_Master set location=?,noticeperiod=?,expected_ctc=?,current_ctc=?,department=? where eid= ? and location = '${e}'`;
          let preferValue = [
            e,
            body.noticeperiod,
            body.expacted_ctc,
            body.current_ctc,
            body.department,
            body.id
          ];
      
          const prefrenceUpdate = db.execute(employeePrefer, preferValue, (err, res) => {
            if (err) throw err;
            return res;
          });
        } catch (err) {
          console.log(err);
        }
      })
    
      return basicUpdate;
  
    } catch (err) {
      console.log(err);
    }
}

module.exports = {employeeUpdateService};