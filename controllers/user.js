const User = require("../modles/user")
const {v4:uuidv4} = require('uuid')  // this is a npm package where you will get unique id for token 
const {setUser} = require("../service/auth")  
async function handleUserSignup(req,res){
    const {name,email,password}= req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}
async function handleUserLogin(req,res){
    const password= req.body.password;
    const email = req.body.email;
    const user = await User.findOne({email,password});
    console.log("User: ",user);
    if(!user){
        return res.render("login",{
            error:"Invalid Username or Password",
        });
    }
    //statefull
    //const sessionId = uuidv4(); we don't need sessionId // create sessionID using uuidv4
    //setUser(sessionId,user); // calling service set method for register sessionid and user in hashmap
   // res.cookie("uid",sessionId);  //  uid is cookie name 

//    stateless
    const token =  setUser(user); // it will give you token
    res.cookie("uid",token);
    //Bearer Authentication
    return res.redirect("/");
}

module.exports= {
    handleUserSignup,
    handleUserLogin,
}