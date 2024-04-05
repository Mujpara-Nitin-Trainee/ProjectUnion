const db = require("../../config/config");
const logger = require('../../middlewares/logger');

const pageDelimiterSearchService = async(firstname,lastname,email,mobileno) => {
    try{

        let delimiterSearch = `select * from Student_Master_ExamLog where ${firstname} and ${lastname} and ${email} and ${mobileno};`
        let delimiterSearchValue = [firstname,lastname,email,mobileno];

        const result = await db.execute(delimiterSearch,delimiterSearchValue, (err,res)=> {
            if(err) throw err;
            return res;
        })

        return result;

    }catch(err){
        logger.error("can't execute:- " + err);
    }
}

module.exports = {pageDelimiterSearchService};