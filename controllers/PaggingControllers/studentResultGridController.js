const {resultGridService,singleResultService,singleAttendanceService} = require("../../services/paggingService");

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

module.exports = {resultGrid,singleResult,singleAttendance};