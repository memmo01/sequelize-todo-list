var db = require("../models");



module.exports=function(app){

 
        app.post("/api/todo",function(req,res){
            db.Todo.create(req.body).then(function(results){
                res.json(results)
                console.log(results)
            })
        })

        app.get("/api/fullList", function(req,res){
            db.Todo.findAll({}).then(function(results){
                res.json(results);
            })
        })

        app.delete("/api/todo/:id?",function(req,res){
            db.Todo.destroy({
                where:{
                    id:req.params.id
                }
            }).then(function(results){
                res.json(results);
            })
        })

        app.put("/api/todo",function(req,res){
            db.Todo.update(
                req.body,
                {
                where:{
                    id:req.body.id
                }
                }).then(function(results){
                    res.json(results);
                })
            
        })
       
}