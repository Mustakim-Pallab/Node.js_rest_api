module.exports = (request, response) => {

    // remove queries from the url, turn "/posts?id=0" into "/posts"
    const url = request.url.split("/")[1]

    switch(url){

        case "getusers":
        
            const { MongoClient, ServerApiVersion } = require('mongodb');
      const uri = "mongodb+srv://tryUser:1EXcFzvnOoIdlOF8@cluster0.hdlnn.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      async function run() {

        try {
      
          await client.connect();
      
          const database = client.db("insertDB");
      
          const userCollection = database.collection("userCollection");
      
          // get documents
            const cursor =userCollection.find({});
            const users = await cursor.toArray();
            console.log(users);
            response.statusCode = 200
            response.setHeader("Content-Type", "application/json")
            response.write(JSON.stringify(users))
            response.end()

        } finally {
      
          // await client.close();
      
        }
      
      }
      
      run().catch(console.dir);
      break
        // response for unexpected get requests
        default:
            response.statusCode = 400
            response.write(`CANNOT GET ${request.url}`)
            response.end()
            break

    }
}
