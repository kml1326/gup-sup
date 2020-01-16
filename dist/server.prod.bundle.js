!function(e){var n={};function o(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=n,o.d=function(e,n,r){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)o.d(r,t,function(n){return e[n]}.bind(null,t));return r},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s=6)}([function(e,n){e.exports=require("mongoose")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("passport")},function(e,n,o){var r=o(0),t=o(15),s=new(0,r.Schema)({name:String,username:String,email:String,password:String});s.methods.verifyPassword=function(e,n){t.compare(e,this.password,(function(e,o){console.log(o,"error"),e&&n(e,!1),n(null,o)}))},s.pre("save",(function(e){var n=this.password,o=this;if(console.log("debug1",this,this.password,this.isModified(this.password)),this.isModified(this.password))return e();t.genSalt(10,(function(r,s){console.log("debug 1.5",r,s),t.hash(n,s,(function(n,r){console.log("debug2",r,n),o.password=r,e()}))}))}));var i=r.model("User",s);e.exports=i},function(e,n,o){var r=o(0),t=r.Schema,s=t.Types.ObjectId,i=new t({name:String,members:[{type:s,ref:"User"}],messages:[{username:{type:String,ref:"User"},message:String,date:{type:Date}}],date:{type:Date}}),u=r.model("Channel",i);e.exports=u},function(e,n,o){var r=o(0),t=r.Schema,s=t.Types.ObjectId,i=new t({toUser:{type:s,ref:"User"},fromUser:{type:s,ref:"User"},message:String}),u=r.model("PrivateMessage",i);e.exports=u},function(e,n,o){(function(e){var n=o(1),r=o(7),t=n(),s=o(0),i=o(8)(r),u=o(9),a=o(2),c=o(10),f=o(11),l=o(12),d=process.env.PORT||8e3;s.connect(process.env.MONGODB_URI||"mongodb://user:kml1326JAISWAL@ds263448.mlab.com:63448/heroku_fg3s8m7l",{useNewUrlParser:!0},(function(e,n){if(e)throw e;console.log("connected to mongodb")})),t.use(u.json()),t.use(u.urlencoded({extended:!0})),t.use(n.static(f.join("dist"))),t.set("views",f.join(e,"./server/views")),t.set("view engine","ejs"),t.use(r({secret:"gup-sup",resave:!0,saveUninitialized:!0,cookie:{maxAge:36e5},store:new i({url:"mongodb://localhost/gup-sup-session"})})),t.use(a.initialize()),t.use(a.session()),o(13)(a),t.use(c()),t.use("/api",o(16)),t.use(o(21));var g={};server=t.listen(d,(function(){console.log("server is running on http://localhost:".concat(d))}));var p=l(server);p.on("connection",(function(e){e.on("ONLINE",(function(n){g[n.userId]=e.id,console.log(g,"online userSocketIds")}));var n=o(4);e.on("SEND_CHANNEL_MESSAGE",(function(e){var o=[],r={username:e.author,message:e.message,date:new Date};n.findOneAndUpdate({_id:e.toChannel},{$push:{messages:r}},(function(r,t){r||n.find({_id:e.channelId},(function(e,n){e||(o=n)}))})),p.emit("RECEIVE_CHANNEL_MESSAGE",o)}));var r=o(5);e.on("SEND_PRIVATE_MESSAGE",(function(e){var n=new r(e),o=[];n.save((function(e,n){if(e)throw e;r.find({$and:[{$or:[{toUser:n.toUser},{fromUser:n.toUser}]},{$or:[{toUser:n.fromUser},{fromUser:n.fromUser}]}]},(function(e,n){e||(o=n),console.log(o,"private message data after saving in mongoode"),p.emit("RECEIVE_PRIVATE_MESSAGE",o)}))}))}))}))}).call(this,"")},function(e,n){e.exports=require("express-session")},function(e,n){e.exports=require("connect-mongo")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("cors")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("socket.io")},function(e,n,o){var r=o(14).Strategy,t=o(3);e.exports=function(e){e.serializeUser((function(e,n){return n(null,e._id)})),e.deserializeUser((function(e,n){t.findById(e,(function(e,o){return n(e,o)}))})),e.use(new r((function(e,n,o){t.findOne({username:e},(function(e,r){return e?o(e):r?void r.verifyPassword(n,(function(e,n){return o(null,!!n&&r)})):o(null,!1)}))})))}},function(e,n){e.exports=require("passport-local")},function(e,n){e.exports=require("bcrypt")},function(e,n,o){var r=o(1).Router(),t=o(17),s=o(18),i=o(19),u=o(20);r.post("/signup",t.signup),r.post("/login",t.login),r.get("/allUser",t.listOfUser),r.post("/create",s.create),r.get("/isLoggedin",u.isLoggedIn,t.isLoggedin),r.get("/allChannel",s.allChannel),r.post("/message",i.privateMessage),r.get("/channel/:id",s.channelInfo),r.post("/channel/message",s.channelMessage),e.exports=r},function(e,n,o){var r=o(3),t=o(2);e.exports={signup:function(e,n){var o=e.body,t=o.name,s=o.username,i=o.email,u=o.password;new r({name:t,username:s,email:i,password:u}).save((function(e,o){if(e)throw e;return n.status(200).json({message:"signup successfull"})}))},login:function(e,n,o){console.log(e.body,"req.user"),t.authenticate("local",(function(r,t,s){return r?o(r):t?void e.logIn(t,(function(r){return r?o(r):n.json({user:e.user})})):n.redirect("/login")}))(e,n,o)},isLoggedin:function(e,n){r.findOne({_id:e.user._id},{password:0},(function(e,o){if(e)throw e;n.json({user:o})}))},listOfUser:function(e,n){r.find({},(function(e,o){if(e)throw e;n.json({listOfUser:o})}))}}},function(e,n,o){var r=o(4);e.exports={create:function(e,n){var o=e.body.name;new r({name:o,members:[],messages:[],date:new Date}).save((function(e,o){if(e)throw e;return n.status(200).json({message:"create channel successfull"})}))},allChannel:function(e,n){r.find({},(function(e,o){if(e)throw e;n.json({listOfChannel:o})}))},channelInfo:function(e,n){r.findById(e.params.id,(function(e,o){e||n.json(o)}))},channelMessage:function(e,n){var o=e.body.id;r.find({_id:o},(function(e,o){if(console.log(o),!e)return n.json(o)}))}}},function(e,n,o){var r=o(5);e.exports={privateMessage:function(e,n){var o=e.body,t=o.toUser,s=o.fromUser;r.find({$or:[{$and:[{toUser:t},{fromUser:s}]},{$and:[{toUser:s},{fromUser:t}]}]},(function(e,o){e||n.json(o)}))},addPrivateMessage:function(e,n){}}},function(e,n){e.exports={isLoggedIn:function(e,n,o){if(e.user)return o();n.status(400).send({message:"Please login to get your information."})}}},function(e,n,o){var r=o(1).Router();r.get("/",(function(e,n){n.render("index")})),r.get("/signup",(function(e,n){n.render("index")})),r.get("/login",(function(e,n){n.render("index")})),r.get("/create",(function(e,n){n.render("index")})),r.get("/logout",(function(e,n){e.session.destroy(),n.status(200).redirect("/login")})),e.exports=r}]);