const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const path=require('path');

app.use(express.urlencoded({ extended: true })); 

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/recipes', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'recipes.html'));
});
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});
app.get('/contact', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
app.get('/about', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Submit sucess ${JSON.stringify(data)}`); 
    alert.box("Submit sucess");
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});