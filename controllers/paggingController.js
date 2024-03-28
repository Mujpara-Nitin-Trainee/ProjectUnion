const {
  paggingService,
  pageOrderbyService,
  resultGridService,
  pageWithAllFilterService,
  singleResultService,
  singleAttendanceService,
  AttendanceReportService,
  pageSearchService,
  pageSeachOptimiumService,
  pageSeachOptimiumLimitService,
  pageDelimiterSearchService
} = require("../services/paggingService");

const pagging = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let offset = (page - 1) * 200;

    const [response] = await paggingService(offset);
    // console.log(response);

    res.render("pagging", { students: response, page });
  } catch (err) {
    console.log(err);
  }
};

const pageOrderby = async (req, res) => {
  try {
    let order = req.query.order || "asc";
    let page = req.query.page || 1;
    let offset = (page - 1) * 200;

    const [response] = await pageOrderbyService(order, offset);
    // console.log(response);

    res.render("orderby", { students: response, page, order });
  } catch (err) {
    console.log(err);
  }
};

const resultGrid = async (req, res) => {
  try {
    const page = req.query.page || 1;
    let offset = (page - 1) * 20;

    const [response] = await resultGridService(offset);
    // console.log(response);

    res.render("resultGrid", { student: response, page });
  } catch (err) {
    console.log(err);
  }
};

const singleResult = async (req, res) => {
  try {
    const sid = req.query.id || 1;
    let total_mark = 0;

    const [response] = await singleResultService(sid);

    for (let i = 0; i < response.length; i++) {
      total_mark = total_mark + response[i].total_marks;
    }
    // console.log(total_marks);

    const [attendance] = await singleAttendanceService(sid);
    // console.log(attendance[0].Present_days);

    res.render("singleResultGrid", {
      student: response,
      total_mark,
      attendance: attendance,
    });
  } catch (err) {
    console.log(err);
  }
};

const singleAttendance = async (req, res) => {
  try {
    const id = req.query.id || 1;
    const date = req.query.month || 12;
    // console.log(id);
    // console.log(date);

    let month = 12;
    let year = 2023;

    if (date == 12) {
      month = 12;
      year = 2023;
    }
    if (date == 1) {
      month = 1;
      year = 2024;
    }
    if (date == 2) {
      month = 2;
      year = 2024;
    }

    const [response] = await AttendanceReportService(month, year, id);
    // console.log(response);

    res.render("attendanceReport", { student: response[0], month, id });
  } catch (err) {
    console.log(err);
  }
};

const pageWithAllFilter = async (req, res) => {
  try {
    const page = req.query.page || 1;

    const offset = (page - 1) * 20;

    const date = req.query.date || 0;

    let year;
    let month;

    if (date == 2) {
      month = 2;
      year = 2024;
    } else if (date == 1) {
      month = 1;
      year = 2024;
    } else if (date == 0) {
      month = 12;
      year = 2023;
    }

    const column = req.query.column || "student_id";
    const order = req.query.order || "asc";

    // console.log(order.trim());

    const [response] = await pageWithAllFilterService(
      month,
      year,
      column,
      order.trim(),
      offset
    );
    // console.log(response);

    res.render("allFilter", {
      student: response,
      rows: Object.keys(response[0]),
      page,
      order,
      column,
      date,
    });
  } catch (err) {
    console.log(err);
  }
};

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

const pageDelimiterSearch = async(req,res) => {
    try{

        const data = req.body.search;

        let values = [];
        let i = 0;
        for(let j=1; j <= data.length; j++){
            
            if((data.charAt(i) == '_' || data.charAt(i) == '^' || data.charAt(i) == '$' || 
                data.charAt(i) == '}' || data.charAt(i) == '{' || data.charAt(i) == '#') && 
                (data.charAt(j) == '_' || data.charAt(j) == '^' || data.charAt(j) == '$' || 
                data.charAt(j) == '}' || data.charAt(j) == '{' || data.charAt(j) == '#')){

                let answer = data.substring(i,j);
                values.push(answer);
                i = j;
            
            }else if((data.charAt(i) == '_' || data.charAt(i) == '^' || data.charAt(i) == '$' || 
            data.charAt(i) == '}' || data.charAt(i) == '{' || data.charAt(i) == '#') && j == data.length){
                let answer = data.substring(i,j);
                values.push(answer);
                i = j;
            }
        }

        let firstname = [];
        let lastname = [];
        let email = [];
        let age = [];
        let gender = [];
        let mobileno = [];

        for(let k=0; k < values.length ; k++){

            if(values[k].charAt(0) == '_'){
                firstname.push(`name LIKE '%${values[k].slice(1)}%'`); 
            }else if(values[k].charAt(0) == '^'){
                lastname.push(`surname LIKE '%${values[k].slice(1)}%'`);
            }else if(values[k].charAt(0) == '$'){
                email.push(`email LIKE '%${values[k].slice(1)}%'`);
            }else if(values[k].charAt(0) == '}'){
                age.push(values[k].slice(1));
            }else if(values[k].charAt(0) == '{'){
                gender.push(values[k].slice(1));
            }else if(values[k].charAt(0) == '#'){
                mobileno.push(`mobile_no LIKE '%${values[k].slice(1)}%'`);
            }
        }

        if(firstname.length > 0) { firstname.join("or") }
        if(lastname.length > 0) { lastname.join("or") }
        if(email.length > 0) { email.join("or") }
        if(age.length > 0) { age.join("or") }
        if(gender.length > 0) { gender.join("or") }
        if(mobileno.length > 0) { mobileno.join("or") }

        function isEmpty(val) {
            return (val === null || val === "" || val === "undefined" || val.length <= 0 || val === 0) ? true : false;
        }
        if(isEmpty(firstname)){
            firstname.push(`firstname LIKE '%'`);
        }
        if(isEmpty(lastname)){
            lastname.push(`surname LIKE '%'`);
        }
        if(isEmpty(mobileno)){
            mobileno.push(`mobile_no LIKE '%'`);
        }
        if(isEmpty(email)){
            email.push(`email LIKE '%'`)
        }

        // console.log(firstname + " " + lastname + " " + email + " " + mobileno);

        const [response] = await pageDelimiterSearchService(firstname,lastname,email,mobileno);

        // console.log(response);

        if(response.length > 0){
            res.render('delimiterSearch',{student:response,rows:Object.keys(response[0])});
        }else{
            res.render('delimiterSearch',{student:response, rows:0});
        }


    }catch(err){
        console.log(err);
    }
}

module.exports = {
  pagging,
  pageOrderby,
  resultGrid,
  pageWithAllFilter,
  singleResult,
  singleAttendance,
  pageSearching,
  pageSearchFilter,
  pageSeachOptimium,
  pageDelimiterSearch
};
