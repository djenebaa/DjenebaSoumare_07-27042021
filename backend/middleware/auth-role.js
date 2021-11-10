const authPage = (permissions) => {
return(req, res, next)=>{
    const userRole = req.body.first_name;
    if(permissions.includes(userRole)){
        next()
    } else{
        return res.status(401).json("You ar not a admin")
    }
}
};

module.exports = {authPage};
