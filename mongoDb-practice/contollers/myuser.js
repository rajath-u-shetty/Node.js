const fs = require("fs");
const User = require("../modules/index");

async function handleGetUsers(req, res){
    const dbUsers = await User.find({});
    return res.status(200).json({ msg: "success"})
}

async function handleGetUserById(req, res){
    const dbData = await User.findById(req.params.id)
    return res.status(200).json({ msg: "success"})
}

async function handleUpdateUser(req, res){
    await User.findByIdAndUpdate(req.params.id, {email: "newmail@g.coom"})
    return res.status(200).json({ msg: "success"})
}

async function handleDeleteUser(req, res){
    await User.findByIdAndDelete(req.params.id)
}

module.exports = {
    handleGetUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser
}