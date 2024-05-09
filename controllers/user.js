const User = require("../modles/user")
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
    return res.redirect("/");
}

module.exports= {
    handleUserSignup,
    handleUserLogin,
}