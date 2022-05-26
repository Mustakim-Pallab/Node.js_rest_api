module.exports = (request, response) => {
  switch (request.url) {
    case "/users":
      request.posts.push(request.body);
      // request.body=JSON.parse(request.body)
      console.log(JSON.parse(request.body))
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(request.posts));

      //
      const User=JSON.parse(request.body);
  

      const { MongoClient, ServerApiVersion } = require('mongodb');
      const uri = "mongodb+srv://tryUser:1EXcFzvnOoIdlOF8@cluster0.hdlnn.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      async function run() {

        try {
      
          await client.connect();
      
          const database = client.db("insertDB");
      
          const userCollection = database.collection("userCollection");
      
          // create a document to insert
      
          
      
          const result = await userCollection.insertOne(User);
      
          console.log(`A document was inserted with the _id: ${result.insertedId}`);
      
        } finally {
      
          // await client.close();
      
        }
      
      }
      
      run().catch(console.dir);

 
      response.end();
      break;

    // response for unexpected get requests
    default:
      response.statusCode = 400;
      response.write(`CANNOT POST ${request.url}`);
      response.end();
  }
};