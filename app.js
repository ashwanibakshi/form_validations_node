var express = require('express')
var bodParser = require('body-parser')
var path = require('path')
var {check,validationResult} = require('express-validator')

var app = express();

app.set("views",path.resolve(__dirname,'views'))

app.set('view engine','ejs')

app.use(bodParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('register',{data:{}})
})

app.post('/',check('name').isLength(5).withMessage("enter name ").isAlpha()
.withMessage('name should have alphabets only'),
check('email').isEmail().withMessage('enter valid email'),
check('phno').isMobilePhone().withMessage('enter correct number')
,(req,res)=>{
    var err = validationResult(req);
    if(!err.isEmpty()){
        res.render('register',{data:err.array()})
    }
  else{
      res.redirect('/')
  }
})

var port = process.env.PORT || 3000 ;
app.listen(port,()=>console.log(`server is running at ${port}`))

module.exports=app;
