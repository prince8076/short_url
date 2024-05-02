const express = require("express");
const {connectToMongoDB} = require('./connect')
const urlRoute = require("./routes/url");
const URL =require('./modles/url');
const path = require('path');  // it is use for ejs for getting the path

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{console.log('mongoDb connected')}) 
 //creating database connectToMongoDB('mongodb://127.0.0.1:27017/database name').then(()=>{console.log('mongoDb connected')}) 
//mongosh it will start your database and you will get this link :'mongodb://127.0.0.1:27017'
// use database name eg:-use short-url
// show collections it will show collection
 //db.users.find({}) find users

//  set ejs {view engine}
app.use('view engine','ejs'); 
app.set('views', path.resolve('./views/home')); // refer ejs all file

//middleware
app.use(express.json()); // it will parse the body


app.get("/test",async (req,res)=>{
    const allUrls = await URL.find({});  // serverside rendering is hard that why we will use EJS
    return res.render('home'); // res.render('ejs file name)
});
    // return res.end(`  
    // <html>
    // <head></head>
    // <body>
    //     <ol>
    //     ${allUrls.map((url)=>
    //             `<li>
    //             ${url.shortId} -  ${url.redirectURL} - ${url.visitHistory.length}
    //             </li>`
    // ).join("")}
    //     </ol>
    // </body>
    // </html>`);
// });
app.use("/url",urlRoute); // for route

app.get('/urls/:shortId',async (req,res)=>{
    const shortId =req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            },
        }
    });
    res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>{  //for starting the port
    console.log(`Server running on this Port : ${PORT}`)
})