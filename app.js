const express=require('express');
const app=express();
const productRoutes=require('./router/product');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://praveen:'+process.env.password+'@cluster0.39m8t.mongodb.net/'+process.env.dbname+'?retryWrites=true&w=majority',{

});
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,PATCH");
        return res.status(200).json({});
    }
    next();



    
});

app.use('/product',productRoutes);


app.use((req,res,next)=>{
    const error= new Error('not found');
    error.status=404;
    next(error);
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});
module.exports=app;