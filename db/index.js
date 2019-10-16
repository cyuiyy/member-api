const mysql = require("mysql")

const connection = mysql.createConnection({
    user:'root',
    password:'root',
    port:'3306',
    database:'member-api',
    host:'localhost'
})

connection.connect((error)=>{
    if(error){
        console.log("连接数据库失败")
    }else{
        console.log("数据库连接成功")
    }
})

module.exports = connection