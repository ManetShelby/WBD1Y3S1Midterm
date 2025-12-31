const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const path=require('path');

app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`ទទួលបានទិន្នន័យ: ${JSON.stringify(data)}`); 
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});