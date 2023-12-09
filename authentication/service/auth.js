const jwt = require("jsonwebtoken");
const secret = "rajath@123"

function setUser(id, user){
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role
  }, secret);
}


function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if(!token) return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
