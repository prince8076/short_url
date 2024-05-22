// const sessionIdToUserMap = new Map(); //hashmap,  we don't need that because we will use stateless using JWT


// we don't need state
// function setUser(id,user){
//     sessionIdToUserMap.set(id,user) //we are appending id and user in Hashmap using set commend
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id); // we are returning id using get 
// }


// stateless
const jwt = require('jsonwebtoken'); // stateless 
const secretKey = "Prince$123@$" // anything you want as a secretKey, a person who have this key, he can make a token
function setUser(user){
    // const payload = {...user}; we can do this, it will send hole user
    
    const payload = {
        _id: user._id,
        email:user.email,
    };
    // console.log("payload : ",payload);
    return jwt.sign(payload,secretKey);
}

function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token,secretKey);
    } catch (error) {
        return null
    }
    
}

module.exports={
    setUser,
    getUser,
}