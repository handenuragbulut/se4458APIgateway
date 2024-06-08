const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const app = express();
const registry = require('./routes/registry.json');
const routes = require('./routes');
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.json());
app.use(helmet());

const auth = (req, res, next) => {
    const url = req.protocol + '://' + req.hostname + PORT + req.path;
    const authString = Buffer.from(req.headers.authorization, 'base64').toString('utf8');
    const authParts = authString.split(':');
    const username = authParts[0];
    const password = authParts[1];
    console.log(username + ' | ' + password);
    const user = registry.auth.users[username];
    if (user) {
        if (user.username === username && user.password === password) {
            next();
        } else {
            res.send({ authenticated: false, path: url, message: 'Authentication Unsuccessful: Incorrect password.' });
        }
    } else {
        res.send({ authenticated: false, path: url, message: 'Authentication Unsuccessful: User ' + username + ' does not exist.' });
    }
};

app.get('/ui', (req, res) => {
    res.render('index', { services: registry.services });
});

// Use the auth middleware for routes that require authentication
app.use(auth);

// Add user and post routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Use existing routes
app.use('/', routes);

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log('Gateway has started on port ' + PORT);
});
