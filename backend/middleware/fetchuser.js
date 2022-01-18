const jwt = require('jsonwebtoken');

let secreat="hlosamibhai";

const fetchuser=(req , res, next)=>{
// get the user from jwt tocket and add id from object
const tocken=req.header("auth-tocken");
if(!tocken){
    res.status(401).send({error:"not match"})
}
try {
    const data=jwt.verify(tocken, secreat)
req.user=data.user
    next()
} catch (error) {
    res.status(401).send({error:"not match"})
}


}








module.exports=fetchuser;