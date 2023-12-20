const express = require("express")
let router = express.Router()
let taskController = require("../controllers/tasks")

router.route("/tasks")
    .get(taskController.index)
    .post(taskController.create)

router.get("/tasks/new", taskController.new)
router.get("/tasks/:id/edit", taskController.edit)

router.route("/tasks/:id").get(taskController.show)
    .put(taskController.update)
    .delete(taskController.destroy)

module.exports = router