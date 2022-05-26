module.exports = (request, response) => {
    switch(request.url){

        // response for unexpected get requests
        default:
            response.statusCode = 400
            response.write(`CANNOT PUT ${request.url}`)
            response.end()

    }
}
