const db = require('../config/config');
const md5 = require('md5');

const registerService = async (body, accesscode) => {

    try {
        let insert_user = `insert into user_master (username,email,mobileno,dob,address,country,Activation_code,Active_Status) values (?,?,?,?,?,?,?,?);`;
        let user_value = [body.username, body.email, body.mobileno, body.dob, body.address, body.country, accesscode, 0];
        // console.log(user_value);
        const result = await db.execute(
            insert_user,
            user_value,
            (err, rows) => {
                if (err) throw err;
                return rows;
            });

        return result;

    } catch (err) {
        console.log(err);
    }
}

const activateUserService = async (body,salt) => {
    try{
        let password = md5((body.password).concat(salt));
        // console.log("Password" + password);

        let activate_user = `update user_master set Active_Status = ?, salt = ?, password = ? where Activation_code = ?;`;
        let activate_values = [1,salt,password,body.accesscode]
        // console.log(activate_values);

        const result = await db.execute(
            activate_user,
            activate_values, 
            (err,rows) => {

                if(err) throw err;
                return rows;
        })

        return result;

    }catch(err){
        console.log(err);
    }
}

const userRemoveService = async (body) => {
    try{

        let removeUser = `delete from user_master where Activation_code = ?`;
        let removeUser_value = [body.accesscode];

        const result = await db.execute(
            removeUser,
            removeUser_value, 
            (err,rows) => {
                if(err) throw err;
                return rows;
        })

        return result;

    }catch(err){
        console.log(err);
    }
}

const userAuthenticationService = async (body) => {
    try{
        let check_user = `select * from user_master where Activation_code = ?`;
        let check_value = [body.accesscode];
        // console.log("From Services " + check_value);
        const result = await db.execute(
            check_user,
            check_value,
            (err,rows) => {
                if(err) throw err;
                return rows;
            }
        )
        return result;
    }catch(err){
        console.log(err);
    }
}

const checkUserService = async (body) => {
    try{
        let check_user = `select * from user_master where email = ?`;
        let check_value = [body.email];
        // console.log("From Services " + check_value);
        const result = await db.execute(
            check_user,
            check_value,
            (err,rows) => {
                if(err) throw err;
                return rows;
            }
        )
        return result;
    }catch(err){
        console.log(err);
    }
}


module.exports = {registerService,activateUserService,userRemoveService,userAuthenticationService,checkUserService}; 