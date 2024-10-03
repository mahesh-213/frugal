const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
const axios = require("axios");
var serviceAccount = require("./key.json");

initializeApp({
  credential:cert(serviceAccount)
});
const db  = getFirestore()
const express = require('express');
const app = express()
app.use(express.static('public'));
console.log("server is running");
app.get('/',(req,res)=>
{
    res.sendFile(__dirname+'/public/'+'index.html');
});
app.get('/signin',(req,res)=>
{
    res.sendFile(__dirname+'/public/'+'signin.html')
});
app.get('/signup',(req,res)=>
{
    res.sendFile(__dirname+'/public/'+'signup.html');
});
app.get('/signupupdate',(req,res)=>
{
    var fmail = req.query.mail;
    db.collection('mysql').where('gmail','==',fmail).get().then((docs)=>
     {
        if(docs.size > 0)
        {
            res.sendFile(__dirname+'/public/'+'signin.html');
        }
     });
    db.collection('mysql').add(
        {
            uname:req.query.uname,
            pass:req.query.pass,
            gmail:req.query.mail
        }
      );
      //const html='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><script>alert("registerd successs");</script></body></html>'
    
      res.sendFile(__dirname+'/public/'+'index.html')
});
app.get('/signinupdate',(req,res)=>
{
     var fmail = req.query.mail
     var fpass = req.query.pass
     db.collection('mysql').where('gmail','==',fmail).where('pass','==',fpass).get().then((docs)=>
     {
        if(docs.size > 0)
        {
            res.sendFile(__dirname+'/public/'+'dummy.html');
        }
        else{
            res.sendFile(__dirname+'/public/'+'signin.html');
        }
     })
});
app.get("/search", async (req, res) => {
    try {
      const { query } = req.query;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
app.listen(8900);


//for handlind backend requests in this i use express js package as the severside rendering