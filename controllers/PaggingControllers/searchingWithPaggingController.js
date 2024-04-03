const {pageWithAllFilterService,pageSearchService,pageSeachOptimiumService,pageSeachOptimiumLimitService} = require("../../services/paggingService");

const pageSearching = async (req, res) => {
    try {
  
          const page = req.query.page || 1;
          const offset = (page-1)*20;
          const date = req.query.date || 0;
  
          const name = req.body.name || req.query.name;
          const surname = req.body.surname || req.query.surname;
          const presentday = req.body.presentday || req.query.presentday || 0;
          const percentage = req.body.percentage || req.query.percentage || 0.00;
          const lessornot  = req.body.lessornot || req.query.lessornot || ">";
          const condition = req.body.condition || req.query.condition || "and";
  
          let year;
          let month;
  
          if(date == 2){
              month = 2;
              year = 2024;
          }else if(date == 1){
              month = 1;
              year = 2024;
          }else if(date == 0){
              month = 12;
              year = 2023;
          }
  
          const column = req.query.column || "student_id";
  
          const order = req.query.order || "asc";
          const total = 0;
          const maxpage = 0;
  
          const [response] = await pageWithAllFilterService(
              month,
              year,
              column,
              order.trim(),
              offset
            );
  
            res.render('searchGrid',{student:response,rows:Object.keys(response[0]),page,date,order,column,name,surname,presentday,percentage,lessornot,condition,total,maxpage});
  
    } catch (err) {
      console.log(err);
    }
};
  
const pageSearchFilter = async(req,res) => {
      try{
  
          const page = req.query.page || 1;
          
          let id = req.body.sid || 1;
          id = id.replaceAll(" ",",") || id.split(" ");
          
          const total = 0;
  
          const [response] = await pageSearchService(id);
  
          if(response.length > 0 ){
              res.render('searchingFilter',{student:response,rows:Object.keys(response[0]),total});
          }else{
              res.render('searchingFilter',{student:response,rows:0,total})
          }
  
      }catch(err){
          console.log(err);
      }
}
  
const pageSeachOptimium = async(req,res) => {
      try{
  
          const page = req.query.page || 1;
          const offset = (page-1)*20;
  
          const date = 0;
          const order = 0;
          const column = 0;
  
          let name = req.body.name || req.query.name;
          let surname = req.body.surname || req.query.surname;
          let presentday = req.body.presentday || req.query.presentday || 0;
          let percentage = req.body.percentage || req.query.percentage || 0.00;
          let lessornot  = req.body.lessornot || req.query.lessornot || ">";
          let condition = req.body.condition || req.query.condition || "and";
  
          name = name.concat('%');
          surname = surname.concat('%');
  
          const [length] = await pageSeachOptimiumService(name,condition,surname,lessornot,presentday,percentage);
  
          const [response] = await pageSeachOptimiumLimitService(name,condition,surname,lessornot,presentday,percentage,offset);
          // console.log(response);
          maxpage = Math.ceil((length.length)/20);
  
          if(response.length > 0){
              res.render('searchingOptimalFilter',{student:response,rows:Object.keys(response[0]),len:response.length,total:length.length,maxpage,page,date,order,column,name,surname,presentday,percentage,lessornot,condition});
          }else{
              res.render('searchingOptimalFilter',{student:response,rows:0,len:length.length,total:length.length,maxpage,page,date,order,column,name,surname,presentday,percentage,lessornot,condition})
          }
  
      }catch(err){
          console.log(err);
      }
}

module.exports = {pageSearching,pageSearchFilter,pageSeachOptimium}