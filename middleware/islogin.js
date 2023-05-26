
const islogin = async (req, res, next) =>{

    //console.log('hello middleware')
    const {token} = req.cookies
    //console.log(token)
    if(token){    
        res.redirect('/dasboard')
    }
    next()

}


module.exports = islogin