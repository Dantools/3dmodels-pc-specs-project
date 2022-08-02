const express = require("express");
const app = express();
const path=require('path');
const nodemailer=require('nodemailer');
var os = require('os');
const si=require('systeminformation');
const { json } = require("express");
const port=5000;



app.use(express.static("public"));
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'))




app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})



app.post('/',(req,res)=>{
    console.log(req.body);

    const transporter=nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'email',
            pass:'password'
        }
    })

    const mailoptions={
        from: req.body.email,
        to: 'email',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailoptions,(error,info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent:' + info.response)
            res.send('success')
        }
    })

})





app.get('/personal', async function (req, res, next) {
    
   var inf={
    'uptime': os.uptime(),
    'mem': await si.mem(),
    'system': await si.system(),
    'os': await si.osInfo(),
    'graphics':await si.graphics(),
    'baseboard': await si.baseboard(),
    'cpu': await si.cpu()
   };

   console.log(inf.baseboard)


   const mem=os.totalmem();
   const tm=bytesToSize(mem);

   

   var devmodel=JSON.stringify(inf.baseboard.model);
   var manufacturer=JSON.stringify(inf.baseboard.manufacturer);
   var distro=JSON.stringify(inf.os.distro);
   var grafika=JSON.stringify(inf.graphics.controllers[0].model);
   var cpuman=JSON.stringify(inf.cpu.manufacturer)
   var cpubr=JSON.stringify(inf.cpu.brand)



    res.render('personal',{devmodel,tm,manufacturer,distro,grafika,cpuman,cpubr});
   });








app.get('/gaming',(req,res)=>{
    res.render('gamingpcs')

})

app.get('/office',(req,res)=>{
    res.render('officepcs')

})

app.get('/professional',(req,res)=>{
    res.render('professionalpcs')

})

app.get('/buildup',(req,res)=>{
    res.render('update')

})



function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
 }
  



app.listen(3000, function (){
    console.log("listening on port 3000")
})