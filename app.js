const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});
app.post('/api/login', (req,res) => {
    // Mock user
    const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
}
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token: token
        });
    });
});
// FORMAT OF TOKEN
// Authorization: Bearer <acccess_token>
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeaders = req.headers['authorization'];
    // Check  if bearer is undefined
    // Get token from array
    // Set the token
    if(typeof bearerHeaders !== 'undefined') {
        
        const bearer = bearerHeaders.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
app.post('/api/posts',verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err)    {
            res.sendStatus(403);
        } else {
            res.json({
                messsage: 'Post created...',
                authData: data
            });

        }
    })
});
app.listen(5000, () => console.log('Server started on port $5000'));