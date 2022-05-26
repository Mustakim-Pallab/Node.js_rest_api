module.exports = (request, response) => {
  switch (request.url) {
    case "/users":
      request.posts.push(request.body);
      console.log(request.body)
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(request.posts));
      response.end();
      break;

    // response for unexpected get requests
    default:
      response.statusCode = 400;
      response.write(`CANNOT POST ${request.url}`);
      response.end();
  }
};
