const jwt = require('jsonwebtoken');
const { promisify } =  require('util')

exports.auth = async (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'You Must Login First' });

    // jwt.verify(authorization , process.env.TOKEN_SECRT , ()=>{

    // })

    try {
        let decoded = await promisify(jwt.verify)(authorization, process.env.TOKEN_SECRT) // payload {id , eamil , role}
        // console.log(decoded);
        req.role = decoded.role;
        // req.id = decoded.id 
        next();
    } catch (error) {
        res.status(401).json({ message: 'You Are Not Authenticated' })
    }
}

exports.restrictTo = (...roles) => { // ['admin'] ['user' , 'admin']
    return function(req ,res , next){
        if (!roles.includes(req.role)) {
            return res.status(403).json({message: 'You Are Not Authorized'});
        } else {
            next();
        }
    }
}