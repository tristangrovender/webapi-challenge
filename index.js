// Import Express
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

// Routes
const projectRoutes = require('./routes/projects/projectRoutes');
const actionRoutes = require('./routes/actions/actionRoutes');

// Initialize Express
const server = express();

// Middleware
server.use(express.json());
// implement helmet here
// implement morgan here 
// implement cors here 

// Use Routes
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

// Test
server.use('/', (req, res) => {
    res.status(200).send("It's aliiivvveee!!!");
});

// Running Server
const port = 4000;
server.listen(port, () => {
    console.log('\n** API up and running on port 4k **');
});

// Important Server Responses

// 200 OK
// 201 Created
// 202 accepted
// 400 bad request (client is not supplying right data)
// 401 unauthorized
// 404 not found 
// 500 internal server error

/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/