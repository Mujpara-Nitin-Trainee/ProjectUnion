const db = require("../config/config");

const paggingService = async (offset) => {
  try {
    let pages = `select * from student_master LIMIT ? OFFSET ?`;
    let pages_Value = ["200", offset.toString()];

    const result = await db.execute(pages, pages_Value, (err, res) => {
      if (err) throw err;
      return res;
    });

    return result;
  } catch (err) {
    console.log(err);
  }
};

const pageOrderbyService = async (order, offset) => {
  try {
    let pageOrderby = `select * from student_master order by name ${order} limit ? offset ?`;
    let pageOrderbyValue = ["200", offset.toString()];

    const result = await db.execute(
      pageOrderby,
      pageOrderbyValue,
      (err, res) => {
        if (err) throw err;
        return res;
      }
    );

    return result;
  } catch (err) {
    console.log(err);
  }
};

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
};

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

module.exports = {
  paggingService,
  pageOrderbyService,
  resultGridService,
  pageSearchService,
  pageWithAllFilterService,
  singleResultService,
  singleAttendanceService,
  AttendanceReportService,
  pageSeachOptimiumService,
  pageSeachOptimiumLimitService
};
