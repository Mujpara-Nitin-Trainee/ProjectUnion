const logger = require('../../middlewares/logger');
const {employeeService} = require("../../services/EmployeeServices/fetchEmployeeService");

const AjaxCrudEmployees = async (req,res) => {

    try{
  
      const [response] = await employeeService();
  
      res.render('employeeList',{employee:response,rows:Object.keys(response[0])});
  
    }catch(err){
      logger.error("unable to fetch data:- " + err);
    }
}
  
const NormalCrudEmployees = async (req,res) => {
  
    try{
  
      const [response] = await employeeService();
  
      res.render('employeeListCRUD',{employee:response,rows:Object.keys(response[0])})
  
    }catch(err){

      logger.error("unable to fetch data:- " + err);
    }
}

module.exports = {AjaxCrudEmployees,NormalCrudEmployees}