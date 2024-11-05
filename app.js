const express = require("express");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    fs.readdir("uploads", {withFileTypes: true}, function(err, files){
        if (err) {
           console.log(err)
        } else {
            res.render('index', {files})
        }
    })
})

app.get("/newNote", function(req, res){
    res.render("new")
})

app.get("/createNote", function(req, res){
    fs.writeFile(`./uploads/${req.query.title}`, req.query.description, function(err){
        if(err){
            console.log(err)
        } else{
            res.redirect("/")
        }
    })
})


app.get("/note/:filename", function(req, res){
    fs.readFile(`./uploads/${req.params.filename}`, "utf-8", function(err, data){
        if (err) {
            console.error(err);
        } else {
            res.render("shownote", {data: data, filename: req.params.filename});
        }
    });
})   
        
app.get("/Delete/:filename", function(req, res){
   fs.unlink(`./uploads/${req.params.filename}`, function(err){
    if(err){
        console.log(err)
    } else{
       res.redirect("/")
    }
   })

})   

app.get("/edit/:filename", function(req, res){
fs.readFile(`./uploads/${req.params.filename}`, "utf-8", function(err, data){
    res.render("edit", {data: data, filename: req.params.filename})
} )
})
app.get("/updateNote/:oldfile" , function(req,res){
    const oldname = req.params.oldfile;
    const newname = req.query.title;
    const description = req.query.description;

    fs.rename(`uploads/${oldname}`, `uploads/${newname}`, function(err){
        if(err){
            console.log(err)
        } else{
            fs.writeFile(`uploads/${newname}`, description, function(err){
                if(err){
                    console.log(err)
                } else{
                    res.redirect("/")
                }
            })
        }
            
    } )
   
   
        
})

app.listen(3000)


