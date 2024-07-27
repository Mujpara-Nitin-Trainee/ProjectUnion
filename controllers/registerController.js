const jwt = require('jsonwebtoken');
const logger = require('../middlewares/logger');
const secret_key = process.env.SECRET_KEY;
const time = process.env.Time;

const {registerService,activateUserService,userRemoveService,userAuthenticationService,checkUserService} = require('../services/registerService');

function generateRandomString(val){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let accesscode = "";

    for(let i=0; i < val; i++){
        accesscode += chars.charAt(Math.floor(Math.floor(Math.random()*chars.length)));
    }

    return accesscode;
}

const userRegister = async(req,res) => {
    try{
        let accesscode = generateRandomString(14);

        const [checkuser] = await checkUserService(req.body);
        
        if(checkuser){
            logger.warn("Email Already Existes in Database");
            res.render('Register',{message:"Plz Change Email Id"});
        }else{
            const [user] = await registerService(req.body,accesscode);
            res.render('Thanks',{accesscode});
        }

    }catch(err){
        logger.error("Can't Get User Data:- " + err);
        res.status(500).json({message:"can't fetch user controller"});
    }
}

const userActivate = async(req,res) => {
    try{
        let salt = generateRandomString(4);

        const [response] = await activateUserService(req.body,salt);

        let userid;
        if(response){
            [userid] = await userAuthenticationService(req.body);
        }

        const token = jwt.sign({userId:userid[0].id},secret_key,{expiresIn:time});
        const result = res.cookie('token', token, {
            httpOnly: true,
        })

        res.render('Home',{result});

    
    }catch(err){
        logger.error("Can't Get activation Code:- " + err);
        res.status(500).json({message:"can't fetch activation controller"});
    }
}

const userAuthenticatation = async(req,res) => {
    try{
        console.log(req.query.accesscode);
        const [response] = await userAuthenticationService(req.query);

        if(response.length == 0){
            logger.error("User Doesn't Exists");
            res.render('error');
        }else{
            res.render('password',{accesscode:response[0].Activation_code});
        }

    }catch(err){
        logger.error("Can't Get Access code:- " + err);
        res.status(500).json({message:"Can't Get Access Code"});
    }
}

const userRemove = async(req,res) => {
    try{
        const [response] = await userRemoveService(req.body);
    }catch(err){
        logger.error("Can't Get user details:- " + err);
        res.status(500).json({message:"can't Remove User"});
    }
}

const userCheck = async(req,res) => {
    try{
        const [response] = await userAuthenticationService(req.body);
        res.json(response);
    }catch(err){
        console.log(err);
    }
}

module.exports = {userRegister,userActivate,userRemove,userAuthenticatation,userCheck};