const {employeeService} = require("../../services/employeeService");

const AjaxCrudEmployees = async (req,res) => {

    try{
  
      const [response] = await employeeService();
  
      res.render('employeeList',{employee:response,rows:Object.keys(response[0])});
  
    }catch(err){
      console.log(err);
    }
}
  
const NormalCrudEmployees = async (req,res) => {
  
    try{
  
      const [response] = await employeeService();
  
      res.render('employeeListCRUD',{employee:response,rows:Object.keys(response[0])})
  
    }catch(err){
      console.log(err);
    }
}

module.exports = {AjaxCrudEmployees,NormalCrudEmployees}