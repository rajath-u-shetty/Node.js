const fs = require("fs")
const os = require("os")
const http = require("http")
const url = require("url")

// fs.appendFile("./content.txt", "i live in banglore",(err)=>{
//     if(err){
//         console.log(err);
//     }
// })
//  fs.readFile("./content.txt","utf-8",(err,result)=> {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
// });

const server = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} new request recieved\n`
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile("./content.txt",log , (err, data) => {
        switch(myUrl.pathname){
            case '/' :
                res.end("home");
                break;
            case "/about":
                const username = myUrl.query.myname
                res.end(`hi ${username}`);
                break;
            case "/search":
                const search = myUrl.query.search_query
                res.end("here are your search results"+ search);
                break;
            default: res.end("404 Not Found")
        }
    })
});
server.listen(1000,)