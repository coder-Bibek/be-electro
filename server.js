var express = require("express");
var app=express();
var sql = require("mysql");
var bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
var con =sql.createConnection({
    host:"localhost",
    database:"cart",
    user:"root",
    password:""
})
con.connect((err)=>{
    if(!err){
        console.log("connected")
    }
})
app.get("/data",(req,res)=>{
    con.query("SELECT * FROM cart_details",(err,rows)=>{
        if(!err){
            res.send(rows)
        }
    })
})
app.post("/users",(req,res)=>{
    let model =req.body.name;
    let image = req.body.username;
    let price =req.body.email;
    var values =[model,image,price]
    con.query("SELECT * FROM cart_details where model = ?",model,(err,results)=>{
        if(results.length===0){
            con.query("INSERT INTO cart_details(model,image,price) VALUES (?) ",[values],(err)=>{
               if(!err){
                   res.send("success")
               }
            })
         
        }
       
        else{
            res.send("email exists")
        }
    })
     
    })
    app.post("/removeme",(req,res)=>{
        let name = req.body.name
        con.query("DELETE FROM cart_details WHERE model=?",name,(err,results)=>{
            if(!err){
                res.send("success")
            }
            else{
                res.send("failure")
            }
        })
    })
app.listen(4000,console.log('started'))