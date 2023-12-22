const express = require("express")
const sessionsController = require("../controllers/sessions")
let router = express.Router()

router.route("/sessions")
    .get(sessionsController.new)
    .post(sessionsController.create)
    .delete(sessionsController.destroy)

module.exports = router