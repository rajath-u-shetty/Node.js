const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next){
  const tokenCookie  = req.cookie?.token;
  req.user = null;
  if(!tokenCookie)
    return next();
  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles) {
  return function(req, res, next) {
    if(!req.user) return res.redirect("/login");
    
    if(!roles.includes(req.user.role)) return res.end("UnAuthorized");

    next();
  }
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
