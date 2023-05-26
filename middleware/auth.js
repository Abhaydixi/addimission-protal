const jwt = require('jsonwebtoken')
const UserModel = require('../model/user')





const checkUserAuth = async (req, res, next) =>{

    //console.log('hello middleware')
    const {token} = req.cookies
    //console.log(token)
    if(!token){    
        req.flash('error', 'unauthorized user')
        res.redirect('/')
    }else{
        const data = jwt.verify(token,'abhaydixit12323')
        //console.log(data)
        const user = await UserModel.findOne({_id:data.id})
        //console.log(admin)
        req.user = user
        next()

    }

}


module.exports = checkUserAuth