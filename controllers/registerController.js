const jwt = require('jsonwebtoken');
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
        // console.log(accesscode);

        const [checkuser] = await checkUserService(req.body);
        
        if(checkuser){
            res.render('Register',{message:"Plz Change Email Id"});
        }else{
            const [user] = await registerService(req.body,accesscode);
            // console.log(user);
            res.render('Thanks',{accesscode});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({message:"can't fetch user controller"});
    }
}

const userActivate = async(req,res) => {
    try{
        let salt = generateRandomString(4);
        // console.log(req.body);
        const [response] = await activateUserService(req.body,salt);
        // console.log(response);
        let userid;
        if(response){
            [userid] = await userAuthenticationService(req.body);
        }
        // console.log(userid);
        const token = jwt.sign({userId:userid[0].id},secret_key,{expiresIn:time});
        const result = res.cookie('token', token, {
            httpOnly: true,
        })

        // console.log(response.length);

        res.render('Home',{result});

    
    }catch(err){
        console.log("err:- " + err);
        res.status(500).json({message:"can't fetch activation controller"});
    }
}

const userAuthenticatation = async(req,res) => {
    try{
        console.log(req.query.accesscode);
        const [response] = await userAuthenticationService(req.query);
        // console.log(response);

        // console.log("Data " + response[0].Activation_code);

        if(response.length == 0){
            res.render('error');
        }else{
            res.render('password',{accesscode:response[0].Activation_code});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Can't Get Access Code"});
    }
}

const userRemove = async(req,res) => {
    try{
        // console.log(req.body);
        const [response] = await userRemoveService(req.body);
        // console.log(response);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"can't Remove User"});
    }
    
}

const userCheck = async(req,res) => {
    try{
        const [response] = await userAuthenticationService(req.body);
        // console.log(response);
        res.json(response);
    }catch(err){
        console.log(err);
    }
}


module.exports = {userRegister,userActivate,userRemove,userAuthenticatation,userCheck};