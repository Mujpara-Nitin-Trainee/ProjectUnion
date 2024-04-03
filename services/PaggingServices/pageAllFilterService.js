const db = require("../../config/config");

const pageWithAllFilterService = async (month, year, column, order, offset) => {
    try {

        let FilterResult = `select ANY_VALUE(Student_Master_ExamLog.student_id) As "student_id",ANY_VALUE(Student_Master_ExamLog.surname) As "surname",
      ANY_VALUE(Student_Master_ExamLog.name) As "name",ANY_VALUE(Student_Master_ExamLog.father_name) As "father_name",
      ANY_VALUE(Student_Master_ExamLog.email) As "email",ANY_VALUE(Student_Master_ExamLog.mobile_no) As "mobile_no",
      ANY_VALUE(Student_Master_ExamLog.college_name) As "college_name", count(attendance_details.student_id) As "Present_days"
      from Student_Master_ExamLog left join attendance_details on 
      Student_Master_ExamLog.student_id = attendance_details.student_id left join Attendance_Master on
      attendance_details.date_id = Attendance_Master.date_id where Month(Attendance_Master.dates) = ? and 
      Year(Attendance_Master.dates) = ? and attendance_details.attendance_log = 1 
      group by attendance_details.student_id,Student_Master_ExamLog.student_id, attendance_details.student_id
      order by ${column} ${order} limit 20 offset ?;`;
  
      let FilterValues = [month.toString(), year.toString(),offset.toString()];
  
      const result = await db.execute(FilterResult, FilterValues, (err, res) => {
        if (err) throw err;
        return res;
      });
  
      return result;
    } catch (err) {
      console.log(err);
    }
};

module.exports = {pageWithAllFilterService};