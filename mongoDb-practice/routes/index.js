const express = require("express");
const { handleGetUsers, handleGetUserById, handleUpdateUser, handleDeleteUser } = require("../contollers/myuser");

const router = express.Router();

router
    .route("/")
    .get(handleGetUsers)
    // .post(handleCreateUser);

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser)

module.exports = router;