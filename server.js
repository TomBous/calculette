let express = require('express');
let cors = require('cors');

const app = express();
let rootPath = '/home/tom/Documents/0-SIMPLON/projet_calculatrice/';
app.get('/' ,(request, response) => {
    response.sendFile(rootPath +'calculette.html');
});
app.get('/app.js' ,(request, response) => {
    response.sendFile(rootPath +'app.js');
});
app.get('/app.css' ,(request, response) => {
    response.sendFile(rootPath +'app.css');
});

app.listen(8090, () => {
    console.log(`Server listening on port 8090`)
});