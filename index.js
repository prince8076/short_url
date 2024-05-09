const express = require("express");
const {connectToMongoDB} = require('./connect')

const URL =require('./modles/url');
const path = require('path');  // it is use for ejs for getting the path


//Routes
const urlRoute = require("./routes/url");
const userRoute = require('./routes/user');
const staticRoute = require('./routes/staticRouter');


const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{console.log('mongoDb connected')}) 
 //creating database connectToMongoDB('mongodb://127.0.0.1:27017/database name').then(()=>{console.log('mongoDb connected')}) 
//mongosh it will start your database and you will get this link :'mongodb://127.0.0.1:27017'
// use database name eg:-use short-url
// show collections it will show collection
 //db.users.find({}) find users

//  set ejs {view engine}
app.set('view engine','ejs'); 
app.set('views', path.resolve('./views')); // refer ejs all file 

//middleware
app.use(express.json()); // it will parse the body 
app.use(express.urlencoded({extended:false}));  //


// routes
app.use("/url",urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);




// app.get("/test",async (req,res)=>{
//     const allUrls = await URL.find({});   // it will give you all the url
//     // serverside rendering is hard that why we will use EJS
//     return res.render('home',{
//         urls:allUrls   // urls is array and getting in our home.ejs 
//         // we can render as much as variable we want
//     }); // res.render('ejs file name)
// });
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


app.get('/url/:shortId',async (req,res)=>{
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