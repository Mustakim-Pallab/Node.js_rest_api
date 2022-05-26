// const handler = {};

// const url =require('url');
// const{StringDecoder} =require('string_decoder');


// handler.handleReqRes =  (req, res)=>{



//     const parsedUrl= url.parse(req.url,true);
//     console.log(parsedUrl);
//     const method= req.method.toLowerCase();
//     const queryStringObject=parsedUrl.query;
//     const headerObject= req.headers;

//     const decoder = new StringDecoder('utf-8');
//     let realData ='';
    
//     req.on('data',(buffer) =>{
//         realData+=decoder.write(buffer);
//     });
    

//     req.on('end', () =>{
//         realData+= decoder.end();
//         console.log(realData);
//         res.end("Hello World");
//     })
    
// };
// module.exports = handler;