const http = require('http');

const todos = [
    { id:1, name:'Book print' },
    { id:2, name:'Book shop' },
]

const server = http.createServer((req, res) => {
    const { headers, url, method } = req;
    
    let body = []
    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        
    let status = 404;
    let response = {
        success: false,
        error:'not found',
        data: null
    }

    if(method === 'GET' && url == '/todos') {
        status = 200;
        response = {
            success: true,
            error:'false',
            data: todos
        }
    } else if(method === 'POST' && url == '/todos') {
        console.log(req.body);
        const { id, text} = JSON.parse(body);
        if(!id || !text) {
            status = 400;
        } else {
        todos.push({id, text});
        status = 201;
        response.success = true;
        response.error = false;
        response.data = todos;
        }
    }
    
 res.writeHead(status, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js'
});

res.end(JSON.stringify((response)));

console.log(headers, url, method);
res.end();

    });

   
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

