module.exports = (request, response) => {
  // remove queries from the url, turn "/posts?id=0" into "/posts"
  const url = request.url.split("?")[0];

  switch (url) {
    case '/users':
      const { MongoClient, ServerApiVersion } = require('mongodb');
      const uri = "mongodb+srv://tryUser:1EXcFzvnOoIdlOF8@cluster0.hdlnn.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

      
      async function run() {

        try {
      
          await client.connect();
      
          const database = client.db("insertDB");
      
          const userCollection = database.collection("userCollection");
      
          // create a document to insert
      
          const id = request.query.searchParams.get("id");
      const query = { name: "ett" };
      const result = await userCollection.deleteOne(query);

      if (result.deletedCount === 1) {

        console.log("Successfully deleted one document.");
  
      } else {
  
        console.log("No documents matched the query. Deleted 0 documents.");
  
      }

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      // request.posts.splice(id, 1);
      // response.write(JSON.stringify(request.posts));
      response.end();
            
        
      
         
        } finally {
      
          // await client.close();
      
        }
      
      }
      
      run().catch(console.dir);
      break
        // response for unexpected get requests
        default:
            response.statusCode = 400
            response.write(`CANNOT Delete ${request.url}`)
            response.end()
            break

    }
}
      
   