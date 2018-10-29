const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const PORT = process.argv[2] || 3000;

// middleware
app.use(bodyParser.json());
app.use(cors());

// routes

app.get('/time', (req, res) => {
    const time = new Date().toTimeString();
    const bodyRes = `The server time is ${time}`;
    res.status(200).send(bodyRes);
});

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send("Error. Please enter the correct username and password");
        return;
    }
    const user = users.find((u) => {
        return u.username === req.body.username && u.password === req.body.password;
    });
    if (!user) {
        res.status(401).send("Error. User or password invalid");
        return;
    }
    const token = jwt.sign({
        sub: user.id,
        username: user.username
    }, "mykey", { expiresIn: "3 hours" });
    res.status(200).send({ access_token: token })
});

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

const users = [
    { id: 1, username: "wily", password: "alcala" },
    { id: 2, username: "bruce", password: "batman" }
];