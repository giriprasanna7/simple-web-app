const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Jenkins Docker App!!</title>
        </head>
        <body>
            <h1>Jenkins CI/CD Automatic Build!</h1>
            <p>CI/CD pipeline is working successfully.</p>
        </body>
        </html>
    `);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
