const User = require("../models").User
const Task = require("../models").Task

module.exports = {
    index: function (req, res) {
        Task.findAll().then((task) => {
            res.render("tasks/index", { tasks: req.user.tasks })
        })
    },
    show: function (req, res) {
        Task.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: "user"
                }
            ]
        }).then((task) => {
            res.render("tasks/show", { task: task })
        })
    },
    edit: function (req, res) {
        Task.findByPk(req.params.id).then((task) => {
            // Task.addCategories([])
            res.render("tasks/edit", { task: task })
        })
    },
    destroy: function(req, res){
        Task.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(deleteCounter){
            res.redirect("/tasks")
        })
    },
    create: function (req, res) {
        Task.create({
            description: req.body.description,
            userId: req.user.id
        }).then(result => {
            res.json(result)
        }).catch(err => {
            console.log(err);
        })
    },
    update: function (req, res) {
        Task.update({ description: req.body.description }, {
            where: {
                id: req.params.id
            }
        }).then(function (response) {
            res.redirect("/tasks/" + req.params.id)
        })
    },
    new: function (req, res) {
        res.render("tasks/new")
    }
}