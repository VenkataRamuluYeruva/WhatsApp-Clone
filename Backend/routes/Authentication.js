const express=require('express');
const connection=require('../connection');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const Api = require('twilio/lib/rest/Api');

const accessTokenSecret='whatsappaccesstokensecret';
const refreshTokenSecret='whatsapprefreshtokensecret';

const jwtmiddleware=(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const [tokentype, value] = authHeader.split(' ');
        
        if(tokentype=='ApiKey'){
            connection.query("SELECT * FROM signup WHERE ApiKey=?", [value], (err, result) => {
                if (err) {
                    return res.status(500).send({ error: 'Database error' });
                }
                if (result.length === 0) {
                    return res.status(404).send({ error: 'User not found' });
                }
                next();
            });
        }
        else if(tokentype=='Bearer'){
            jwt.verify(value,accessTokenSecret,(err,user)=>{
                if(err){
                    return res.status(403).send({error:'Invalid token'});
                }
                req.user=user;
                next();
            });
        }
        else{
            return res.send({message:"Invalid token type"});
        }
    } 
    return res.send({message:"Authorization header is missing"});
}


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query("SELECT * FROM signup WHERE Email=?", [email], (err, result) => {
        if (err) {
            console.log("Error in login:",err);
            return res.status(500).send({ error: 'Database error' });
        }
        if (result.length === 0) {
            return res.status(400).send({ error: 'User not found' });
        }
        
        bcrypt.compare(password, result[0].Password, (err, isMatch) => {
            if (err) {
                return res.status(500).send({ error: 'Error comparing password' });
            }    
            if (!isMatch) {
                return res.status(401).send({ error: 'Password is incorrect' });
            }

            const accessToken = jwt.sign({ userId: result[0].UserId },accessTokenSecret, { expiresIn: '30m' });
            const refreshToken = jwt.sign({ userId: result[0].UserId },refreshTokenSecret, { expiresIn: '7d' });

            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

            return res.status(200).send({
                message: 'User logged in successfully',
                accessToken,
                refreshToken,
                userId: result[0].UserId,
                ApiKey:result[0].ApiKey,
            });
        });
    });
});



router.post("/signup",(req,res)=>{
    const {username,email,password}=req.body;
    const salt=10;
    const userid=Math.floor(Math.random()*1000000000);
    const apiKey=crypto.randomBytes(32).toString('hex');

    connection.query("select * from  signup where Email=?",[email],(err,result)=>{
        if(err){
            return res.status(500).send({
                error:err
            });
        }
        if(result.length>0){
            return res.status(400).send({
                message:"Email already exist"
            });
        }
        bcrypt.hash(password.toString(),salt,(err,hashpassword)=>{
            if(err){
                return res.status(500).send({
                    error:err
                });
            }
            connection.query("insert into signup(UserId,Username,Email,Password,ApiKey) values(?,?,?,?,?)",
                [userid,username,email,hashpassword,apiKey],(err,result)=>{
                    if(err){
                        return res.status(500).send({
                            error:err
                        });
                    }
                    res.cookie('ApiKey',apiKey, { httpOnly: true, secure: true });
                    return res.status(201).send({
                        message:"User registered successfully"
                    });
                })

        })
    })
    
})

router.get("/logout",(req,res)=>{
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).send({
        message:'user successfully logout'
    });
});

module.exports=jwtmiddleware;
module.exports=router;