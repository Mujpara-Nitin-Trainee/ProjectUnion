const {paggingService,pageOrderbyService,resultGridService,pageWithAllFilterService,singleResultService,singleAttendanceService,AttendanceReportService} = require('../services/paggingService');

const pagging = async(req,res) => {
    try{
        let page = req.query.page || 1;
        let offset = (page-1)*200;
    
        const [response] = await paggingService(offset);
        // console.log(response);

        res.render("pagging",{students:response,page})

    }catch(err){
        console.log(err);
    }
}

const pageOrderby = async(req,res) => {
    try{
        let order = req.query.order || "asc";
        let page = req.query.page || 1;
        let offset = (page-1)*200;

        const [response] = await pageOrderbyService(order,offset);
        // console.log(response);

        res.render('orderby',{students:response,page,order});

    }catch(err){
        console.log(err);
    }
} 

const resultGrid = async(req,res) => {
    try{
        const page = req.query.page || 1;
        let offset = (page - 1) * 20;   

        const [response] = await resultGridService(offset);
        // console.log(response);

        res.render('resultGrid',{ student: response, page })

    }catch(err){
        console.log(err);
    }
}

const singleResult = async(req,res) => {
    try{

        const sid = req.query.id || 1;
        let total_mark = 0;

        const [response] = await singleResultService(sid);

        for(let i=0; i < response.length;i++){
            total_mark = total_mark + response[i].total_marks;
        }
        // console.log(total_marks);

        const [attendance] = await singleAttendanceService(sid);
        // console.log(attendance[0].Present_days);

        res.render('singleResultGrid',{student: response,total_mark,attendance:attendance})

    }catch(err){
        console.log(err);
    }
}

const singleAttendance = async(req,res) => {
    try{

        const id = req.query.id || 1;
        const date = req.query.month || 12;
        // console.log(id);
        // console.log(date);

        let month = 12;
        let year = 2023;

        if (date == 12) { month = 12; year = 2023;}
        if (date == 1) { month = 1; year = 2024;}
        if (date == 2) { month = 2; year = 2024;}

        const [response] = await AttendanceReportService(month,year,id);
        // console.log(response);

        res.render('attendanceReport',{student:response[0],month,id});

    }catch(err){
        console.log(err);
    }
}

const pageWithAllFilter = async(req,res) => {
    try{

        const page = req.query.page || 1;

        const offset = (page-1)*20;

        const date = req.query.date || 0;

        let year;
        let month;

        if(date == 2){ month = 2; year = 2024; }
        else if(date == 1){ month = 1; year = 2024; }
        else if(date == 0){ month = 12; year = 2023; }

        const column = req.query.column || "student_id";
        const order = req.query.order || "asc";

        // console.log(order.trim());

        const [response] = await pageWithAllFilterService(month,year,column,order.trim(),offset);
        // console.log(response);

        res.render('allFilter',{student:response,rows:Object.keys(response[0]),page,order,column,date})

    }catch(err){
        console.log(err);
    }
}

const pageSearching = async(req,res) => {
    try{

    }catch(err){
        console.log(err);
    }
}

module.exports = {pagging,pageOrderby,resultGrid,pageWithAllFilter,singleResult,singleAttendance}