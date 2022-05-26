module.exports = (request, response) => {

    // remove queries from the url, turn "/posts?id=0" into "/posts"
    const url = request.url.split("?")[0]

    switch(url){

        case "/users":
            const { MongoClient, ServerApiVersion } = require('mongodb');
      const uri = "mongodb+srv://tryUser:1EXcFzvnOoIdlOF8@cluster0.hdlnn.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
      async function run() {

        try {
      
          await client.connect();
      
          const database = client.db("insertDB");
      
          const userCollection = database.collection("userCollection");
      
          // create a document to insert
      
          if (request.query.searchParams.get("id")){
            const id = request.query.searchParams.get("id")
            response.statusCode = 200
            const query ={ _id: ObjectId(id) };
            const users = await userCollection.findOne(query);

            response.setHeader("Content-Type", "application/json")
            response.write(JSON.stringify(users))
            console.log(users);
            response.end()
        } else {
            // else return all posts (index)


            const cursor =userCollection.find({});
            const users = await cursor.toArray();
            console.log(users);
            response.statusCode = 200
            response.setHeader("Content-Type", "application/json")
            response.write(JSON.stringify(users))
            response.end()
        }

        
      
         
        } finally {
      
          // await client.close();
      
        }
      
      }
      
      run().catch(console.dir);
            // if the id query is present return the show result
            

            break
        // response for unexpected get requests
        default:
            response.statusCode = 400
            response.write(`CANNOT GET ${request.url}`)
            response.end()
            break

    }
}
