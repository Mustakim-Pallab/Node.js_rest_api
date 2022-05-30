module.exports = (request, response) => {

  // const req=request.body;
    const url = request.url.split("/")[1]
    const id = request.url.split("/")[2]

    switch(url){

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
      
         
      
          
          const updatedUser = request.body;
          
          const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                },

                // $set: {

                //   name: 'goru',
                //   email : 'goru@gmail.com'
          
                // },


            };
            const result = await userCollection.updateOne(filter, updateDoc, options)
            console.log('updating', id)
            response.statusCode = 200
            response.setHeader("Content-Type", "application/json")
            
            response.write(JSON.stringify(request.body));
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
            response.write(`CANNOT PUT ${request.url}`)
            response.end()
            break

    }
}


