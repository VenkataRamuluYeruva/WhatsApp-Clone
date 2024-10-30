const mysql=require('mysql');

const connection=mysql.createConnection({
    'host':'localhost',
    'port':'3306',
    'user':'root',
    'password':'',
    'database':'whatsapp'
});

connection.connect((error)=>{
    if(error){
        console.log('connection is disconnected',error);
    }
    else{
        console.log('Database connection is established');
    }
});

module.exports=connection;

