const router =require("koa-router")();

const query = require("../db/query.js")

//查所有信息
router.get('/api/userlist',async ctx=>{
    let data = await query('select * from userlist');
    console.log(data)
    ctx.body = data.data
})

//add添加
router.post('/api/add',async ctx=>{
    let {name,age,phone,sex,address,idCard} = ctx.request.body
    let sql = 'insert into userlist (name,age,phone,sex,address,idCard) values (?,?,?,?,?,?)'
    
    //查询是否添加过
    if(!name || !age || !phone || !sex || !address ||!idCard){
        return ctx.body= {code:2,msg:"参数不全"}
    }
    
    let isData = await query('select * from userlist where idCard =?',[idCard])
    
    if(isData.data.length){
        return ctx.body = {code:3,msg:'此人已存在'}
    }else{
        let data = await query(sql,[name,age,phone,sex,address,idCard])
    
        if(data.msg === 'success'){
            ctx.body = {code:1,msg:'添加成功'}
        }else{
            ctx.body = {code:0,msg:'添加失败'}
        }
    }

    
})

//删除 获取id
router.get('/api/delete',async ctx=>{
    let { id } = ctx.query
    let sql = 'delete from userlist where id=?'

    let res = await query(sql,[id])

    if(res.msg === 'error'){
        ctx.body = {code:0,msg:'删除失败'}
    }else{
        ctx.body = {code:1,msg:'删除成功'}
    }
})

//修改  
router.post('/api/update',async ctx =>{
    let {name,age,phone,sex,address,idCard,id} = ctx.request.body

    let sql = 'update userlist u set u.name=?,u.age=?,u.phone=?,u.sex=?,u.address=?,u.idCard=? where id=?'

    let res = await query(sql,[name,age,phone,sex,address,idCard,id])

    if(res.msg === 'error'){
        ctx.body = {code:0,msg:'修改失败'}
    }else{
        ctx.body = {code:1,msg:'修改成功'}
    }
})

module.exports = router