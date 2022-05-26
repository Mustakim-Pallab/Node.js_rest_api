
// const http= require('http');
// const{handleReqRes}= require('./helpers/HandleReqRes');


// const app ={};

// app.config = {
//     port:3000 ,
// };

// app.createServer= () =>{

//     const server =http.createServer(app.handleReqRes);
//     server.listen(app.config.port, ()=>{
//         console.log(`listening at ${app.config.port}`);
//     });

// };

// app.handleReqRes=handleReqRes;

// app.createServer();


//jhanker mahmood

//**************************************** */

// const express = require('express');

// const app= express();
// const port =5000;

// const cors =require('cors');

// app.use(cors());
// app.use(express.json());

// app.get('/',(req,res) =>{
//     res.send('Running my crud');
// });

// app.listen(port,()=>{
//     console.log("Running" );
// })

// //password: 1EXcFzvnOoIdlOF8
// //username: tryUser

// // mongo db connection

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://tryUser:1EXcFzvnOoIdlOF8@cluster0.hdlnn.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// async function run() {

//     try {
  
//       await client.connect();
  
//       const database = client.db("insertDB");
  
//       const userCollection = database.collection("userCollection");
  
//       // create a document to insert
  
      
//       //post to DB

//       var request = require('request');
  

//       app.post('/users', async(req,res)=>{
//           console.log(req.body);
//           console.log("hitting");
//           res.send('Running my crud');
//       })


  
//     } finally {
  
//       await client.close();
  
//     }
  
//   }
  


//*********************************************************** */

// Import http library
const http = require("http");
// use env variable to define port with default
const PORT = process.env.PORT || 5000;
// import the url standard library for parsing query string
require("url")

// import data
const posts = require("./data");

// Import our routers
const get = require("./get");
const post = require("./post");
const put = require("./put");
// add an extra R since delete is a reserved word
const deleteR = require("./delete");
// require function to parse body
const getBody = require("./getBody")

//create our server object, pass server function as callback argument
const server = http.createServer((request, response) => {

  // add the data to the request object so our routes can access it
  request.posts = posts

  // adding the query to the request object
  request.query = new URL(request.url, `http://${request.headers.host}`)

  // handle request based on method then URL
  switch (request.method) {
    case "GET":
      getBody(request, response, get);
      break;

    case "POST":
      getBody(request, response, post);
      break;

    case "PUT":
        getBody(request, response, put);
      break;

    case "DELETE":
        getBody(request, response, deleteR);
      break;

    default:
      // Send response for requests with no other response
      response.statusCode = 400;
      response.write("No Response");
      response.end();
  }
});

// get the server to start listening
server.listen(PORT, (err) => {
  // error checking
  err ? console.error(err) : console.log(`listening on port ${PORT}`);
});
