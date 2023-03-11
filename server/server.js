const express = require('express');
const app = express(); //assigning express function to app variable
const database = require('mysql'); //This line contains mysql module
const bodyParser = require('body-parser'); //This line contains body-parser module
const cors = require('cors');
const port = 5004;

app.use(express.static('public'));
app.use(cors());

app.set("view engine","ejs");

const urlencodedParser = bodyParser.urlencoded({extended : false});
app.use(bodyParser.json());

let connection = database.createConnection({
    host : 'localhost',
    user : 'root',
    password : "",
    database : 'ecommerce-react',
})

connection.connect((error) => {
    if(error){
    console.log(error);
    }
    else{
    console.log('Datbase Connected');
    }
});

app.post('/signIn',urlencodedParser,(req,response) => {
    if((req.body).type==='signUp'){
        const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
        const firstIndex = Math.floor(Math.random() * 26);
        const secondIndex = Math.floor(Math.random() * 26);
        const thirdIndex = Math.floor(Math.random() * 26);
        const prefix = alphabet[firstIndex]+alphabet[secondIndex]+alphabet[thirdIndex];
        const suffix = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        let userID = prefix + suffix;
        let proceedCheck = true ;
        let userData ;
        let QueryToGetInfo = `SELECT * FROM userInfo ;`;
        connection.query(QueryToGetInfo,(err,res) => {
            if(err){
                console.log(err);
            }
            else{
                userData = JSON.parse(JSON.stringify(res));
                userData.forEach((ele)=>{
                    if(ele.username===(req.body).username && ele.password===(req.body).password){
                        proceedCheck = false;
                    }
                })
                if(proceedCheck){
                    let queryForNewTable = `CREATE TABLE ${userID} ( jsonData JSON );`
                    connection.query(queryForNewTable,(err,res) => {
                        if(err) console.log(err);
                        else{
                            let createArrQuery = `INSERT INTO ${userID} (jsonData) VALUES ('${JSON.stringify([])}');`
                            connection.query(createArrQuery,(err,res) => {
                                if(err) console.log(err);
                                else{
                                    console.log(res);
                                }
                            })
                        }
                    })

                    let queryForSignUp = `INSERT INTO userInfo(id, username, password) VALUES ('${userID}','${(req.body).username}','${(req.body).password}');`
        connection.query(queryForSignUp, (err,res) => {
            if(err){
                console.log(err);
            }
            else{
                response.send(userID);

            }
        });
                }
                else{
                    const obj = {
                        message:'User Already exists'
                    }
                    response.send('User already exists')
                }
            }
        })
    }
    else{
        let userData ;
        let QueryToGetInfo = `SELECT * FROM userInfo ;`;
        connection.query(QueryToGetInfo,(err,res) => {
            if(err){
                console.log(err);
            }
            else{
                let check = false ;
                let userID ;
                userData = JSON.parse(JSON.stringify(res));
                userData.forEach((ele)=>{
                    if(ele.username===req.body.username && ele.password===req.body.password){
                        check = true;
                        userID = ele.id;
                    }
                })
                if(check){
                    response.send(userID);
                }
                else{
                    const obj = {
                        message:'User Not exists, Please Sign-Up'
                    }
                    response.send('User Not Found');
                }
            }
        })
    }
})

app.post('/details',urlencodedParser,(req,response) => {
    if(req.body.type==='getCart'){
        let getQuery = `SELECT * FROM ${req.body.user} WHERE 1;`
        connection.query(getQuery,(err,res) => {
            if(err){
                console.log(err);
            }
            else{
                let result = JSON.parse(JSON.stringify(res)) 
                result = JSON.parse(result[0].jsonData);
                response.send(JSON.stringify(result));
            }
    })
    }
    else{
        let getQuery = `SELECT * FROM ${req.body.user} WHERE 1;`
    connection.query(getQuery,(err,res) => {
        if(err){
            console.log(err);
        }
        else{
            let result = JSON.parse(JSON.stringify(res)) 
            result = JSON.parse(result[0].jsonData);
            let obj = {
                img:req.body.img,
                rate:req.body.rate,
                link:req.body.link,
                quantity:req.body.Quantity
            }
            let check = true;
            let index
            result.map((ele,i) => {
                if(ele.link===obj.link){
                    index=i;
                    check=false;    
                }
            })
            if(check){
                result.push(obj);
            }
            else{
                result.splice(index,1);
                result.push(obj);
            }
            console.log(JSON.stringify(result));
            response.send(JSON.stringify(result));
            let putQuery = `UPDATE ${req.body.user} SET jsonData='${JSON.stringify(result)}' WHERE 1;`;
            connection.query(putQuery,(err,res) => {
                if(err) console.log(err);
                else{
                    console.log(res);
                }
            })
        }
    })
    }
})

app.post('/Home',urlencodedParser,(req,response)=>{
    let getQuery = `SELECT * FROM ${req.body.user} WHERE 1;`
    connection.query(getQuery,(err,res)=>{
        if(err) console.log(err);
        else{
            let result = JSON.parse(JSON.stringify(res))[0].jsonData
            result = JSON.parse((result));
            response.send(result);
        }
    })
})

app.post('/cart',urlencodedParser,(req,response)=>{
    let getQuery = `SELECT * FROM ${req.body.user} WHERE 1;`
    connection.query(getQuery,(err,res)=>{
        if(err) console.log(err);
        else{
            let result = JSON.parse(JSON.stringify(res))[0].jsonData;
            result = JSON.parse((result));
            result.splice(req.body.index,1)
            response.send(JSON.stringify(result));
            console.log(result);
            let putQuery = `UPDATE ${req.body.user} SET jsonData='${JSON.stringify(result)}' WHERE 1;`;
            connection.query(putQuery,(err,res) => {
                if(err) console.log(err);
                else{
                    console.log(res);
                }
            })
        }
    })
})

app.post('/checkout',urlencodedParser,(req,response)=>{
    if(req.body.type==='emptyCart'){
        let putQuery = `UPDATE ${req.body.user} SET jsonData='${JSON.stringify([])}' WHERE 1;`;
        connection.query(putQuery,(err,res) => {
            if(err) console.log(err);
            else{
                console.log(res);
                response.send(JSON.stringify([]));
            }
        })
    }
})

app.listen(port, () => console.log(`listening to port, ${port}`))