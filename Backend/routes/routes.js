const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwtmiddleware = require('./Authentication');


router.get('/users', (req, res) => {
    const { username } = req.params;
    connection.query('select u.*,s.ApiKey from users as u join signup as s on u.id=s.userid', (err, result) => {
        if (err) {
            res.send({
                error: err
            });
        }
        else {
            res.send({
                result: result
            });
        }
    });
});

router.get('/user/:userid', (req, res) => {
    const { userid } = req.params;
    const query = `SELECT 
            username, 
            email, 
            DATE_FORMAT(joined_at, '%Y-%m-%d') AS join_date, 
            DATE_FORMAT(joined_at, '%H:%i:%s') AS join_time,
            profile_pic,
            gender 
            FROM users WHERE id = ?`;

    connection.query(query, [userid], (err, result) => {
        if (err) {
            res.status(500).send({
                error: 'Database error',
                details: err
            });
        } 
        else {
            res.status(200).send({
                result: result
            });
        }
    });
});


router.get("/otherusers/:userid",(req,res)=>{
    const {userid}=req.params;
    connection.query('select * from users where id!=?',[userid],(err,result)=>{
        if(err){
            res.send({
                error:err
            })
        }
        else{
            res.send({
                result:result
            });
        }

    })
});



router.post('/sendMsg', (req, res) => {
    const {messageType,UserID,receiverID,content}=req.body;
    console.log(req.body);
    // const messageId = Math.floor(Math.random() * 1000);
    // connection.query("insert into messages (messageId,senderId,receiverId,contentType,messagebody) values(?,?,?,?,?)",
    //      [messageId,UserID, receiverID,messageType,content], (err, result) => {
    //     if (err) {
    //         res.send({
    //             error: err
    //         });
    //         console.log(err);
    //     }
    //     else {
    //         res.send({
    //             result: result
    //         });
    //     }

    // })
});

router.post('/getMsg', (req, res) => {
    const {senderId,receiverId}=req.body;
    connection.query("select * from messages where senderId=? and receiverId=? or senderId=? and receiverId=? ORDER BY sentat ASC",
         [senderId,receiverId,receiverId,senderId], (err, result) => {
        if (err) {
            res.send({
                error: err
            });
        }
        else {
            res.send({
                result: result
            });
        }

    })
});


module.exports = router;