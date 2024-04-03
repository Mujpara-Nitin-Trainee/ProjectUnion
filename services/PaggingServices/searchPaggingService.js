const db = require("../../config/config");

const pageSearchService = async (id) => {
    try {
  
      let pageSearching = `select ANY_VALUE(Student_Master_ExamLog.student_id) As "student_id",ANY_VALUE(Student_Master_ExamLog.surname) As "surname",
      ANY_VALUE(Student_Master_ExamLog.name) As "name",ANY_VALUE(Student_Master_ExamLog.father_name) As "father_name",
      ANY_VALUE(Student_Master_ExamLog.email) As "email",ANY_VALUE(Student_Master_ExamLog.mobile_no) As "mobile_no",
      ANY_VALUE(Student_Master_ExamLog.college_name), count(attendance_details.id) As "Present_day",
      ROUND((((count(attendance_details.id))*100)/91),2) As "Percentage"
      from Student_Master_ExamLog, attendance_details where Student_Master_ExamLog.student_id in (${id}) and
      Student_Master_ExamLog.student_id = attendance_details.student_id and attendance_details.attendance_log = 1
      group by Student_Master_ExamLog.student_id;`
  
      let pageSeachingValue = [id];
  
      const result = await db.execute(pageSearching,pageSeachingValue,(err,res) => {
          if(err) throw err;
          return res;
      })
  
      return result;
  
    } catch (err) {
      console.log(err);
    }
}

const pageSeachOptimiumService = async(name,condition,surname,lessornot,presentday,percentage) => {
    try{

        let optimalSearch = `select ANY_VALUE(Student_Master_ExamLog.student_id) AS "student_id",ANY_VALUE(Student_Master_ExamLog.surname) AS "surname",
        ANY_VALUE(Student_Master_ExamLog.name) AS "name",ANY_VALUE(Student_Master_ExamLog.father_name) As "father_name",
        ANY_VALUE(Student_Master_ExamLog.email) AS "email",ANY_VALUE(Student_Master_ExamLog.mobile_no) AS "mobile_no",
        ANY_VALUE(Student_Master_ExamLog.college_name) AS "college_name",count(attendance_details.id) As "Present_day",
        (((count(attendance_details.id))*91)/100) As "Percentage"
        from Student_Master_ExamLog inner join  attendance_details on
        Student_Master_ExamLog.student_id = attendance_details.student_id and attendance_details.attendance_log = 1 where
        Student_Master_ExamLog.name like '${name}' ${condition} Student_Master_ExamLog.surname like '${surname}'
        group by Student_Master_ExamLog.student_id having Present_day ${lessornot} ${presentday} ${condition} Percentage ${lessornot} ${percentage};`

        let optimalSearchValue = [name,condition,surname,lessornot,presentday,percentage];

        const result = await db.execute(optimalSearch,optimalSearchValue,(err,res) => {
            if(err) throw err;
            return res;
        })

        return result;

    }catch(err){
        console.log(err);
    }
}

const pageSeachOptimiumLimitService = async(name,condition,surname,lessornot,presentday,percentage,offset) => {
    try{

        let optimalSearch = `select ANY_VALUE(Student_Master_ExamLog.student_id) AS "student_id",ANY_VALUE(Student_Master_ExamLog.surname) AS "surname",
        ANY_VALUE(Student_Master_ExamLog.name) AS "name",ANY_VALUE(Student_Master_ExamLog.father_name) As "father_name",
        ANY_VALUE(Student_Master_ExamLog.email) AS "email",ANY_VALUE(Student_Master_ExamLog.mobile_no) AS "mobile_no",
        ANY_VALUE(Student_Master_ExamLog.college_name) AS "college_name",count(attendance_details.id) As "Present_day",
        (((count(attendance_details.id))*91)/100) As "Percentage"
        from Student_Master_ExamLog inner join  attendance_details on
        Student_Master_ExamLog.student_id = attendance_details.student_id and attendance_details.attendance_log = 1 where
        Student_Master_ExamLog.name like '${name}' ${condition} Student_Master_ExamLog.surname like '${surname}'
        group by Student_Master_ExamLog.student_id having Present_day ${lessornot} ${presentday} ${condition} Percentage ${lessornot} ${percentage} limit 20 offset ${offset};`

        let optimalSearchValue = [name,condition,surname,lessornot,presentday,percentage];

        const result = await db.execute(optimalSearch,optimalSearchValue,(err,res) => {
            if(err) throw err;
            return res;
        })

        return result;        

    }catch(err){
        console.log(err);
    }
}

module.exports = {pageSearchService,pageSeachOptimiumService,pageSeachOptimiumLimitService};