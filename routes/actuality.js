const express = require('express');
const Actuality = require('../models/actuality');
const router = express.Router();
const multer = require('multer');
const res = require('express/lib/response');
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

router.get('/getbyid/:id',(req,res)=>{
    let id = req.params.id;
    Actuality.findById({_id:id}).then(
        (data)=>{
            res.send(data);
    
        },
        (err)=>{
        res.send(err)
    
    }
    )
    
    
    });
router.post('/ajout',upload.any('image'),  (req, res) => {

 

    let actualityfromfostman = req.body;
    let actuality = new Actuality(actualityfromfostman);
    actuality.image = filename;
  
 

  actuality.save().then(
        (data) => {
            filename = '';
            console.log(data);
           
            res.send(data);
        },
        (error) => {
            filename = '';
         
            console.log(error);
            res.send(error);
        }

    )
});
router.delete('/delete/:id',(req,res)=>{
    let id =req.params.id;
    Actuality.findByIdAndDelete({_id:id}).then(
        (deleted)=>{
            res.send(deleted);
        },
        (err)=>{
            res.send(err);
        }
    );
    
});
router.put('/update/:id',upload.any('image'),(req,res)=>{
    let id = req.params.id;
    let a =req.body;
    if(filename.length>0){
        a.image= filename;
    }
    Actuality.findByIdAndUpdate(
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
    router.get('/getall',(req,res)=>{
       
        Actuality.find().then(
            (data)=>{
                res.send(data);
        
            },
            (err)=>{
            res.send(err)
        }
        )
        
        
        });

module.exports=router;