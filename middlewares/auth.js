const jwt = require('jsonwebtoken');
const logger = require('../middlewares/logger');

const secret_key = process.env.SECRET_KEY;

const auth = (req,res,next) => {
    let cookie = req.headers.cookie;

    if(!cookie){
        res.redirect('/api/user/login');
        // logger.warn("User is not Logged In");
        // return res.sendStatus(403);
    }else{
        try{
            const data = jwt.verify(cookie.split('=')[1],secret_key);
            return next();
        }catch(err){
            res.redirect('/api/user/login');
            // logger.err("unable to get token:- " + err);
            // return res.sendStatus(403);
        }   
    }

}

module.exports = auth;