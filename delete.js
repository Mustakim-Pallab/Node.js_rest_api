module.exports = (request, response) => {

  const url = request.url.split("/")[1]
  const id = request.url.split("/")[2]

  switch (url) {
    case 'users':
      const { MongoClient, ServerApiVersion } = require('mongodb');
      const uri = "mongodb+srv://tryUser:1EXcFzvnOoIdlOF8@cluster0.hdlnn.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

      const ObjectId = require('mongodb').ObjectID;

      async function run() {

        try {
      
          await client.connect();
      
          const database = client.db("insertDB");
      
          const userCollection = database.collection("userCollection");
      
        
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);

      if (result.deletedCount === 1) {

        console.log("Successfully deleted one document.");
  
      } else {
  
        console.log("No documents matched the query. Deleted 0 documents.");
  
      }

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
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
      
   