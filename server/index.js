const express= require('express');
const cors= require('cors');

const app= express();
const PORT=process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
//app.use(express.urlencoded());
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken= process.env.TWILIO_AUTH_TOKEN;
// const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const twilioAccount = require('twilio')(accountSid, authToken);

const authRoutes= require('./routes/auth.js')

app.use('/auth',authRoutes);

app.get("/",(req,res)=>{
    res.send(`Server is running on ${PORT}`);
})
// app.post('/',(req,res)=>{
//    const {message, user:sender, type, members} = req.body;
//     if(type === 'message.new'){
//         members.forEach(({user})=>{
//             if(!user.online){
//                 twilioClient.messages.create({
//                     body:`${message.user.fullName} has just texted -- ${message.text}`,
//                     messagingServiceSid
//                 })
//             }
//         }
        
//         )
//     }

// })
app.listen(PORT,()=>{console.log(`Server is running on ${PORT}`)})