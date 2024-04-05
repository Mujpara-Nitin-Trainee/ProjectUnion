const jwt = require('jsonwebtoken');
const logger = require('../middlewares/logger');
const secret_key = process.env.SECRET_KEY;
const time = process.env.Time;

const {checkUserService,loginService,updateAccesscodeService,RemoveAccesscodeService,setPasswordService} = require('../services/loginService');

function generateRandomString(val){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let accesscode = "";

    for(let i=0; i < val; i++){
        accesscode += chars.charAt(Math.floor(Math.floor(Math.random()*chars.length)));
    }

    return accesscode;

}

const userLogin = async(req,res) => {
    try{

        const [checkUser] = await checkUserService(req.body.email);

        if(checkUser.length == 1){
            const [response] = await loginService(req.body,checkUser[0].salt);
            // console.log(response);

            let cookie = req.headers.cookie;

            // if(cookie){
            //     logger.warn("User is Already registered");
            //     res.render('Home',{message:"You Are Already Logined"});
            // }

            if(response.length == 1){

                const token = jwt.sign({userId:response[0].id},secret_key,{expiresIn:time});
                const result = res.cookie('token', token, {
                    httpOnly: true,
                })    
                res.render('Home',{result,message:null});
                // res.status(200).json({token});
            }else{
                logger.error("Invalid Credientials");
                res.render('login',{message:"Invalid Credientials"});
            }

        }else{
            logger.error("There is issue from database side");
            res.status(500).json({message:"there is issue from database side"});
        }
    }catch(err){
        logger.error("Can't Getting Data " + err);

    }
}

const userForgot = async(req,res) => {
    try{
        const [checkUser] = await checkUserService(req.body.email);
        let accesscode = generateRandomString(14);
        if(checkUser.length == 1){
            const [response] = await updateAccesscodeService(checkUser[0].email,accesscode);
            if(response.length != 0){
                res.render('Forgot',{accesscode});
            }
        }

    }catch(err){
        logger.error("Can't Getting Email Address:- " + err);

        res.status(500).json({message:"Can't Getting Email Address"});
    }
}

const userRemoveAccesscode = async(req,res) => {
    try{
        const [response] = await RemoveAccesscodeService(req.body);

        
    }catch(err){
        logger.error("Can't Getting Data:- " + err);

        res.status(500).json({message:"can't Getting Data"});
    }
}

const userSetPassword = async(req,res) => {
    try{
        const [response] = await setPasswordService(req.query);

        if(response.length != 0){
            res.render('password',{accesscode:response[0].Activation_code});
        }

    }catch(err){
        logger.error("Can't Getting Data:- " + err);

        res.status(500).json({message:"can't Getting data"});
    }
}

module.exports = {userLogin,userForgot,userSetPassword,userRemoveAccesscode};