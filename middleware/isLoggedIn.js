const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const isLogined = (req,res,next) => {
    if(req.cookie){
        if(req.cookie.token){
            let result = jwt.verify(req.cookie.token,process.env.SECRET_KEY);
            console.log(result);
        }
    }
}

module.exports = isLogined;