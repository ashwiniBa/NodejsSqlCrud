var http= require('http');
http.createServer((req,res)=>{
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hello Ashwini');
	console.log('Hello Ashwini')
}).listen(9001);

console.log('server running at http://127.0.0.1:9001/');