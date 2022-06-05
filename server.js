const express = require('express')
const mongoose = require('./connect/db');
const cors = require('cors');
const AdminApi=require('./routes/admin');
const AgentApi=require('./routes/agent');
const actualityApi=require('./routes/actuality');

let app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: '*'
}));
app.use('/admin',AdminApi);
app.use('/agent',AgentApi);
app.use('/actuality',actualityApi);

//get image
app.use('/getimage',express.static('./upload'))

app.listen(3000,()=>{
    console.log('server work');
})