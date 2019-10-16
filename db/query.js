

const connect = require("./index")

const query = (sql,params = []) =>{
    return  new Promise((resolve,reject)=>{
        connect.query(sql,params,(error,data) =>{
            if(error){
                reject({code:0,msg:'error'})
            }else{
                resolve({msg:'success',data})
            }
        })
    })
}


module.exports = query