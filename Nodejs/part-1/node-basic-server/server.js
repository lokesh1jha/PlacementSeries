const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`)

    if (req.url === '/'){
        try {
            const filePath = path.join(__dirname, 'index.html');
            const html = await fs.readFile(filePath, 'utf-8')
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(html)
        }
        catch(error){
            res.writeHead(500, {'Context-Type': 'text/plain'})
            res.end('Something went wrong reading the page')
        }
    }
    else if(req.url === '/about'){
        try {
            
            res.writeHead(200, { 'Content-Type': 'text/plain'});
            res.end('This is NO Framework Project, without Express ')
        }
        catch(error){
            res.writeHead(500, {'Context-Type': 'text/plain'})
            res.end('Something went wrong our side')
        }
    }else {
        res.writeHead(404, {'Context-Type': 'text/plain'})
        res.end('Page Not Found')
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
