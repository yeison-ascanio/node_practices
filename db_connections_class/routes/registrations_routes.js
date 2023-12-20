const express = require("express")
let router = express.Router()
let registrationsController = require("../controllers/registrations")

router.get("/signup", registrationsController.new)

module.exports = router