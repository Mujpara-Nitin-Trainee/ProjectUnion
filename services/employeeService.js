const db = require("../config/config");

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

const citiesService = async (body) => {
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

const employeeService = async() => {
  try{
    let employees = `select * from Employee_Master`;
    let values = [];

    const result = await db.execute(employees,values, (err,res) => {
      if(err) throw err;
      return res;
    })
  
    return result;
  }catch(err){
    console.log(err);
  }
}

const fetchEmployeeService = async(body) => {
  try{

    let employeeDetail = `select * from Employee_Master where id = ?`;
    let value = [body.id]

    const employee = await db.execute(employeeDetail,value, (err,res) => {
      if(err) throw err;
      return res;
    })

    return employee

  }catch(err){
    console.log(err);
  }
}

const fetchEmployeeEducationService = async(body) => {
  try{

    let educationDetail = `select * from Education_Master where eid = ?`;
    let educationValue = [body.id];

    const education = await db.execute(educationDetail,educationValue,(err,res) => {
      if(err) throw err;
      return res;
    })

    return education;

  }catch(err){
    console.log(err);
  }
}

const fetchEmployeeLanguageService = async(body) => {
  try{
    let langaugeDetail = `select * from Employee_language_Master where eid = ?`;
    let value = [body.id];

    const language = await db.execute(langaugeDetail,value, (err,res) => {
      if(err) throw err;
      return res;
    })

    return language;
  }catch(err){
    console.log(err);
  }
}

const fetchEmployeeTechService = async(body) => {
  try{

      let techDetail = `select * from Employee_Tech_Master where eid = ?`;
      let value = [body.id];
      const tech = await db.execute(techDetail,value, (err,res) => {
          if(err) throw err;
          return res;
      })

      return tech;

  }catch(err){
    console.log(err);
  }
}

const fetchEmployeeWorkService = async(body) => {
  try{

      let workExpDetails = `select * from Work_experience_master where eid = ?`;
      let value = [body.id];
      
      const workExp = await db.execute(workExpDetails,value, (err,res) => {
        if(err) throw err;
        return res;
      })
      return workExp;

  }catch(err){
    console.log(err);
  }
}

const fetchEmployeeReferService = async(body) => {
  try{

      let referDetails = `select * from Reference_Master where eid = ?`;
      let value = [body.id];

      const refer = await db.execute(referDetails,value, (err,res) => {
          if(err) throw err;
          return res;
      })

      return refer;

  }catch(err){
    console.log(err);
  }
}

const fetchEmployeePreferService = async(body) => {
  try{

      let preferDetails = `select * from Prefrerance_Master where eid = ?`;
      let value = [body.id];

      const prefer = await db.execute(preferDetails,value,(err,res) => {
        if(err) throw err;
        return res;
      })

      return prefer;

  }catch(err){
    console.log(err);
  }
}

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

module.exports = {
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
};
