const express = require("express")
let router = express.Router()
let registrationsController = require("../controllers/registrations")

router.get("/signup", registrationsController.new)
router.route("/users").post(registrationsController.create)
module.exports = router