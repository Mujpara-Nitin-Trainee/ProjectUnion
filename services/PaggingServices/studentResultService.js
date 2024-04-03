const db = require("../../config/config");

const resultGridService = async (offset) => {
    try {
      let resultGrid = `select Student_Master_ExamLog.Student_id,Student_Master_ExamLog.name,
          Sum(
              case
                  when Exam_details.exam_id = 1 then gotted_practical_marks
              else 0
          end) As "T_practical_marks",
          sum(
              case
                  when Exam_details.exam_id = 1 then gotted_theory_marks
              else 0
          end) As "T_theory_marks",
          Sum(
              case
                  when Exam_details.exam_id = 2 then gotted_practical_marks
              else 0
          end) As "P_practical_marks",
          sum(
              case
                  when Exam_details.exam_id = 2 then gotted_theory_marks
              else 0
          end) As "P_theory_marks",
          Sum(
              case
                  when Exam_details.exam_id = 3 then gotted_practical_marks
              else 0
          end) As "F_practical_marks",
          sum(
              case
                  when Exam_details.exam_id = 3 then gotted_theory_marks
              else 0
          end) As "F_theory_marks"
          From Exam_details,Student_Master_ExamLog
          where Student_Master_ExamLog.Student_id = Exam_details.student_id
          group by Student_Master_ExamLog.Student_id,Student_Master_ExamLog.name limit 20 offset ?`;
  
      let resultGridValue = [offset.toString()];
  
      const result = await db.execute(resultGrid, resultGridValue, (err, res) => {
        if (err) throw err;
        return res;
      });
  
      return result;
    } catch (err) {
      console.log(err);
    }
  };
  
  
const singleResultService = async(sid) => {
      try{
  
          let detailedresult = `select Student_Master_ExamLog.Student_id, Student_Master_ExamLog.name, Exam_Master.Exam_type, 
          Subject_Master.subject_name, Exam_details.total_theory_marks, Exam_details.gotted_theory_marks, 
          Exam_details.total_practical_marks,Exam_details.gotted_practical_marks, Exam_details.total_marks
          From Student_Master_ExamLog,Exam_Master,Subject_Master,Exam_details
          where Student_Master_ExamLog.Student_id = Exam_details.student_id and 
          Exam_Master.exam_id = Exam_details.exam_id and Subject_Master.subject_id = Exam_details.subject_id 
          and Student_Master_ExamLog.Student_id = ?;`
          let detailedValue = [sid.toString()];
  
          const result = await db.execute(detailedresult,detailedValue,(err,res) => {
              if(err) throw err;
              return res;
          })
  
          return result;
  
      }catch(err){
          console.log(err);
      }
}
  
const singleAttendanceService = async(sid) => {
      try{
  
          let attendance_detail = `select Student_Master_ExamLog.student_id,Student_Master_ExamLog.name, count(attendance_details.student_id) As "Present_days"
          from Student_Master_ExamLog, Attendance_Master, attendance_details where
          Student_Master_ExamLog.student_id = attendance_details.student_id and 
          Attendance_Master.date_id = attendance_details.date_id 
          and attendance_details.attendance_log = "1" and Student_Master_ExamLog.student_id = ?
          group by Student_Master_ExamLog.student_id,Student_Master_ExamLog.name;`
  
          let attendanceValue = [sid];
  
          const result = await db.execute(attendance_detail,attendanceValue, (err,res) => {
              if(err) throw err;
              return res;
          })
  
          return result;
  
      }catch(err){
          console.log(err);
      }
}

module.exports = {resultGridService,singleResultService,singleAttendanceService};