const express= require("express");
const {connect}= require('getstream');
const bcrypt= require('bcrypt');
const StreamChat= require('stream-chat').StreamChat;
const crypto= require('crypto');
const router= express.Router();
require('dotenv').config();

const api_key=process.env.STREAM_API_KEY;
const api_secret=process.env.STREAM_API_SECRET;
const app_id=process.env.STREAM_APP_ID;


const signup= async(req,res)=>{
    try{
        const {fullName,username,phone, password}=req.body;
        const userId= crypto.randomBytes(16).toString('hex');
        const serverClient= StreamChat.getInstance(api_key,api_secret);

        const hashedPassword= await bcrypt.hash(password,10);
       
        const token = serverClient.createToken(userId);
        //console.log(token);
        res.status(200).json({token,fullName,userId,hashedPassword, phone,username});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
}
const signin=async(req,res)=>{
    try{
      const {username,password}= req.body;
      const serverClient= connect(api_key,api_secret,app_id);
      const client= StreamChat.getInstance(api_key,api_secret);

      const {users}= await client.queryUsers({name:username});
      if(!users.length) {
        return res.status(400).json({message:'user not found'});

        
      }
      const success= await bcrypt.compare(password,users[0].hashedPassword);
      const token= serverClient.createUserToken(users[0].id);
      if(success) res.status(200).json({token,fullName:users[0].fullName,username,userId:users[0].id});
      else
      res.status(500).json({message:"Incorrect password"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }
}
router.post('/signup',signup);
router.post('/signin',signin);
module.exports= router;