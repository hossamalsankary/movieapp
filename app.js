var express = require("express"); //require express
var bodyParser = require('body-parser') // body-parser to get request  to get request iformatiom
const request = require('request');
let app = express();
app.use(bodyParser.urlencoded({ extended: true })) //used body-parser

app.set('view engine', 'ejs') // to write dir og app without extention

//root
app.get("/",function(req ,res){
    
   res.render("home" , {data:""} )
})


app.get("/home",function(req,res){

    res.render("home" , {data:""} )

})

app.get("/err",function(req,res){

    res.render("home" , {data:"Erro"} )

})

//=============================================^_^

app.post("/home",function(req,res){

    let q =  req.body.search;   //get the request data 

    var url = "http://www.omdbapi.com/?s="+q+"&apikey=c0d91d67" //this APi for omdbiap return Json file

    request(url, function (error, response, body) { //send a request to this APi 
            
        if(!error && response.statusCode == 200){ 

            let data  =  JSON.parse(body); //handle this json file to js object
            

            if(data.Search === undefined){ //cheack if search Array found

                res.redirect("err")
                return false

                }
        
                data.Search.forEach(movie => {

                    movie.link = "https://thepiratebay.org/search/" + movie.Title;  //create a search link is tourent serach
                
                });
                

                res.render("home",{
                    data:data.Search, // send the Array to home.ejs
                
                })                      
        }
    });

    
})


app.listen(5000 , ()=>{console.log("your app working in 127.0.0.1:5000")}); //start my app