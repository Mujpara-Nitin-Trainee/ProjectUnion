const db = require("../../config/config");

const AttendanceReportService = async(month,year,id) => {
    try{

        let attendance_report = `select Student_Master_ExamLog.student_id,Student_Master_ExamLog.name, 
        count(attendance_details.student_id) As "Present_days"
        from Student_Master_ExamLog, Attendance_Master, attendance_details where
        Student_Master_ExamLog.student_id = attendance_details.student_id and 
        Attendance_Master.date_id = attendance_details.date_id and Month(Attendance_Master.dates) = ? 
        and Year(Attendance_Master.dates) = ? and attendance_details.attendance_log = "1" 
        and Student_Master_ExamLog.student_id = ? 
        group by Student_Master_ExamLog.student_id,Student_Master_ExamLog.name;`

        let attendanceValue = [month,year,id];

        const result = await db.execute(attendance_report,attendanceValue,(err,res) => {
            if(err) throw err;
            return res;
        })

        return result;


    }catch(err){
        console.log(err);
    }
}

module.exports = {AttendanceReportService};