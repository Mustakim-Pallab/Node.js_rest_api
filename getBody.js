module.exports = (request, response, next) => {
    let data = []

    // assemble stream of data from request body
    request.on("data", dataChunk => {
        data.push(dataChunk)
    })

    request.on("end", () => {  
        request.body = Buffer.concat(data).toString();
   
        if (request.headers["content-type"] === "application/json"){

            request.body = JSON.parse(request.body)
        }


        //mongoo

        response.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        response.setHeader('Access-Control-Allow-Credentials', true);

        // move on to next step in handling respone
         next(request, response) 
    })
}