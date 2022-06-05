const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require( 'jsonwebtoken');
const res = require('express/lib/response');
const router=express.Router();
const multer = require('multer');
const cors = require('cors')


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
//register
router.post('/register',upload.any('image'),(req,res)=>{
    let adminfrombody=req.body;
    let admin = new Admin(adminfrombody);
    admin.image=filename;
    //cryptage
    // let Key =bcrypt.genSaltSync(10);
    // admin.password=bcrypt.hashSync(adminfrombody.password,Key);
    admin.role="USER";
    admin.save().then(
        (data)=>{
            filename = '';
            res.send(data);
        },
        (err)=>{
            res.send(err);
        }
    )
    });
//login
router.post('/login',(req,res)=>{
    console.log(req)
    let adminData=req.body;

console.log(adminData)

    Admin.findOne({email:adminData.email}).then(
        (data)=>{
          console.log(data)
            // let validPass=bcrypt.compareSync(adminData.mdp,data.mdp);
            let validPass=adminData.mdp;

            if(validPass == false){
                console.log('rrr')
                //console.log(validPass);
               // res.send('email or pass incorrect')
               res.json({status: "no", message : "password incorrect", data: null})
            }else{
                let token = jwt.sign({_id : data._id, email: data.email},'123@456');
                res.send({myToken :token,role : data.role ,status:"sucess"});
                
            }
        },
        (err)=>{
            res.send('email or pass invalid')
        }
    )

});

router.get('/getall',(req,res)=>{
       
    Admin.find().then(
        (data)=>{
            res.send(data);
    
        },
        (err)=>{
        res.send(err)
    }
    )
    
    
    });
    router.get('/getbyid/:id',(req,res)=>{
        let id = req.params.id;
        Admin.findById({_id:id}).then(
            (data)=>{
                res.send(data);
        
            },
            (err)=>{
            res.send(err)
        
        }
        )
        
        
        });
    module.exports=router;