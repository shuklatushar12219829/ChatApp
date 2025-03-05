const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoutes");
const socket=require('socket.io');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.error("DB Connection Error:", err.message));

app.get('/',(req,res)=>res.send("API working"))
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);


const PORT = process.env.PORT || 5000;
const server=app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const io=socket(server,{
  cors:{
    origin:process.env.CLIENT_URL,
    Credential:true,
  }
  transports: ["websocket", "polling"],
});
global.onlineUsers=new Map();
io.on("connection",(socket)=>{
  global.chatSocket=socket;
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id);
  })
  socket.on("send-msg",(data)=>{
    const sendUserSocket=onlineUsers.get(data.to);
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-receive",data.message);
    }
  })
})
