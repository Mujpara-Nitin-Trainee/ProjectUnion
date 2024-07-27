const db = require('../config/config');
const md5 = require('md5');
const logger = require('../middlewares/logger');

const checkUserService = async (body) => {
    try {
        let checkUser = `select * from user_master where email = ?`;
        let checkUserValues = [body];

        const result = await db.execute(checkUser, checkUserValues, (err, res) => {
            if(err){
                logger.error("can't execute:- " + err);
            }else{
                return res;
            }
        })

        return result;

    } catch (err) {
        logger.error("can't get data:- " + err);
    }
}

const loginService = async (body,salt) => {
    try {
        let password = md5(body.password.concat(salt));
        let check_user = `select * from user_master where password = ?;`;
        let checkUserValues = [password];

        const result = await db.execute(check_user,checkUserValues, (err,res) => {
            if(err) throw err;
            return res;
        })

        return result;

    } catch (err) {
        logger.error("can't get data:- " + err);
    }
}

const updateAccesscodeService = async(body,accesscode) => {
    try{

        let updateAccesscode = `update user_master set Activation_code = ? where email = ?`
        let updateValues = [accesscode,body];

        const result = await db.execute(updateAccesscode,updateValues, (err,res) => {
            if(err) throw err;
            return res;
        })

        return result;

    }catch(err){
        logger.error("can't get data:- " + err);
    }
}

const RemoveAccesscodeService = async(body) => {
    try{
        let updateAccesscode = ` update user_master set Activation_code = "" where Activation_code = ?`;
        let updateValues = [body.accesscode];

        const result = await db.execute(updateAccesscode,updateValues,(err,res) => {
            if(err) throw err;
            return res;
        })

        return result;

    }catch(err){
        logger.error("can't get data:- " + err);
    }
}

const setPasswordService = async(body) => {
    try{

        let selectUser = `select * from user_master where Activation_code = ?`;
        let selectValue = [body.accesscode];

        const result = await db.execute(selectUser,selectValue,(err,res) => {
            if(err) throw err;
            return res;
        })

        return result;

    }catch(err){
        logger.error("can't get data:- " + err);
    }
}

module.exports = { loginService,checkUserService,updateAccesscodeService,RemoveAccesscodeService,setPasswordService };