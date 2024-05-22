const { getUser } = require('../service/auth')

function checkforauthentication(req,res,next){
    const authorizationHeaderValue = req.headers["authorization"]
    console.log("authorizationHeaderValue :" ,authorizationHeaderValue)
    req.user = null;
    if (
        !authorizationHeaderValue || 
        !authorizationHeaderValue.startsWith('Bearer')
    )   return next(); 
    // startsWith check the starting name here it is bearer
        
        const token = authorizationHeaderValue.split('Bearer ')[1];
        const user = getUser(token);
        req.user = user;
        return next();
    
    
} 

function restrictTo(roles){
    return function(req,res,next){
        if(!req.user){
            return res.redirect("/login");
        }
        if(!roles.includes(req.user.role)) return res.end('UnAuthorized');
        return next();
    }


}

// async function restrictToLoggedinUserOnly(req,res,next){
//     // const userUid = req.cookies?.uid; // we are checking 
//     //Bearer Authentication
//     const userUid = req.headers["authorization"]
//     if(!userUid) return res.redirect('/login');
//     const token = userUid.split('Bearer ')[1] // Bearer ["" , '23u1232ukhdjdh'] 
//     // const user = getUser(userUid); // we are calling service get method for getting id
//     const user = getUser(token);
//     if (!user) return res.redirect('/login');
//     req.user = user;
//     next();
// }

// async function checkAuth(req,res,next){
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers["authorization"]
//     const token = userUid.split('Bearer ')[1]
//     const user = getUser(token);
//     // const user = getUser(userUid);
//     req.user = user;  // we are assign req.user to new user id and this is a private id
//     next();
// }

module.exports={
    // restrictToLoggedinUserOnly,
   // checkAuth,
    checkforauthentication,
    restrictTo,
    
}