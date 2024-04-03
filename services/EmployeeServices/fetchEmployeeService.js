const db = require("../../config/config");

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

module.exports = {employeeService,fetchEmployeeService,fetchEmployeeEducationService,
                fetchEmployeeLanguageService,fetchEmployeeTechService,fetchEmployeeWorkService,
                fetchEmployeeReferService,fetchEmployeePreferService}