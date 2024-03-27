const jwt = require('jsonwebtoken');

const secret_key = process.env.SECRET_KEY;

const auth = (req,res,next) => {
    let cookie = req.headers.cookie;
    // console.log(cookie);

    if(!cookie){
        res.redirect('/api/user/login');
        // return res.sendStatus(403);
    }else{
        try{
            const data = jwt.verify(cookie.split('=')[1],secret_key);
            // console.log(data);
            return next();
        }catch(err){
            return res.sendStatus(403);
        }   
    }

}

module.exports = auth;