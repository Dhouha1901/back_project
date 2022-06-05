const express = require('express');
const Agent = require('../models/agent');

const user = require('../models/admin');
const res = require('express/lib/response');
const router=express.Router();
const multer = require('multer');
filename = '';

const storage1 = multer.diskStorage(
    {
    destination : './upload',
    filename: function(req, file, cb){
        date = Date.now();
        filename = date + '.' + file.mimetype.split('/')[1]
        cb(null, filename);
       

    },
    }
);
const upload =  multer ({storage: storage1});
router.post('/ajout', upload.any('image'),(req, res)=>{

    let agentfrom = req.body;
    let agent = new Agent(agentfrom);
    agent.image = filename;
    agent.save().then(
        (data)=>{
            filename = '';
            res.send(data);
        },
        (err)=>{
            filename = '';
            res.send(err);
        }

    )});
    router.get('/getall',(req,res)=>{
       
        user.find().then(
            (data)=>{
                res.send(data);
        
            },
            (err)=>{
            res.send(err)
        }
        )
        
        
        });
        router.get('/getbyid/:id',(req,res)=>{
   
            let id = req.params.id
            Agent.findById({_id:id}).then(
                (data)=>{
                    res.send(data);
            
                },
                (err)=>{
                res.send(err)
            }
            )
            
        });
        router.put('/update/:id',upload.any('image'),(req,res)=>{
            let id = req.params.id;
            let a =req.body;
            if(filename.length>0){
                a.image= filename;
            }
            Agent.findByIdAndUpdate(
                {_id:id},
                a,{new:true}
            ).then(
        
                (updated)=>{
                    console.log(updated)
                res.send(updated);},
                (err)=>{
                    res.send(err)
                }
            );
            });
    module.exports=router;