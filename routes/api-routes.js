var db = require("../models");



module.exports=function(app){

 
        app.post("/api/todo",function(req,res){
            db.Todo.create(req.body).then(function(results){
                res.json(results)
                console.log(results)
            })
        })

        app.get("/api/notComplete", function(req,res){
            db.Todo.findAll({
                where:{
                    complete:false
                }
            }).then(function(results){
                res.json(results);
            })
        })


        app.get("/api/completed",function(req,res){
            db.Todo.findAll({
                    where:{
                        complete:true
                    }
            }).then(function(results){
                res.json(results)
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
            db.Todo.update({
                action:req.body.action,
                date:req.body.date,
                complete:true
                },{
                where:{
                    id:req.body.id
                }
                }).then(function(results){
                    console.log(req.body.complete)
                    console.log(req.body.id)

                    res.json(results);
                })
            
        })
       
}