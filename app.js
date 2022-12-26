//Signup page api making via mailchimp

/*express
bodyparser
request
https
json
app
*/

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { json } = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",  function(req, res){
    res.sendFile(__dirname + "/NewSignup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME: firstName, 
                    LNAME: lastName 
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/ac58170d76";

    const option = {
        method : "POST",
        auth: "Key"
    }

    const request = https.request(url, option, function(response) {
        response.on("data", function(data){
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html")
            }

        console.log(JSON.parse(data));

        })
    })

    request.write(jsonData);
    request.end();

});


app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(req, res){
    console.log("App is running on port 3000!")
})

//api key

// f52f27f9b384b8649cc8db0870ec06d7-us9

//list id

// ac58170d76
