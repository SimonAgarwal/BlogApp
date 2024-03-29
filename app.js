var express,app,bodyParser,mongoose;
express=require("express");
app=express();
require('dotenv').config();
bodyParser=require("body-parser");
mongoose=require("mongoose");
const config=require("./config/mongo");
//config
//mongoose.connect('mongodb://localhost:27017/BlogApp');
console.log(config.database)
mongoose.connect(config.database,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
    console.log("Connected to database"+config.database);
})
mongoose.connection.on('error',(err)=>{
    console.log("Not connected"+err);
}) 
var methodOverride=require("method-override");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"))
//database model
var blogSchema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	create:{type: Date, default: Date.now}
});
var Blog=mongoose.model("Blog",blogSchema);
//Blog.create({
	//title:"Test Blog",
	//image:"data:image/jpeg;base64,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",
	//body: "i am just testing it out",
	//});
app.get("/",function(req,res){
	Blog.find({},function(err,blogs){
	if(err){
		console.log("error");
	}else{
		res.render("index",{blogs:blogs});
	}	
	});
});
app.get("/blogs",function(req,res){
	res.redirect("/");
})

app.get("/blogs/new",function(req,res){
		res.render("new");
		});

app.post("/blogs",function(req,res){
	  var formData = req.body.blog;
	Blog.create(formData,function(err,newBlog){
		console.log(newBlog);
		if(err){
			res.render("new");
		}
		else
			{
				res.redirect("/");
			}
	});
		 
		 });
app.get("/blogs/:id",function(req,res){
Blog.findById(req.params.id,function(err,foundBlog){
	if(err)
	{
		res.redirect("/blogs");
}
else{
	res.render("show",{blog:foundBlog});
}
});
});

app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
if(err){
console.log(err)
}
		else{
res.render("edit",{blog:foundBlog})
		}
	})
})
app.put("/blogs/:id",function(req,res){
Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updadatedBlog){
	if(err){
		res.redirect("blogs");
}
	else{
res.redirect("/blogs/"+req.param.id);
	}
})
})
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
if(err){
	console.log(err)
}
		else{
res.redirect("/blogs")
		}
	})
})
app.listen(process.env.PORT,function(){
	console.log("Server started");
});