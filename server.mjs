// console.log("Hello World!");
// 1. create server.mjs file
// 2. npm init -y - create package.json
// 3. correct package.json
// 4. npm i express - download express 
// 5. import express at top of page
// 6. initialize express into a variable
// 7. listen to express(app)

// import Express (build on top of Node)
import express from 'express';

// create an instance of express() & cache it to "app" variable
const app = express();
const PORT = 3000;

// route methods 

// when user makes GET request to root/homepage
app.get('/', (req, res) => {
    // shows this message
    res.send('Hello from the other side...');
});
// GET method route -- request to /about page ...
app.get('/about', function (req, res) {
    res.send(`Don't forget about us...`);
});

// route path matching requests to /secret page ... (w/ some regex)
// any number of string literals could be b/t "secr" & "et" and it will run, also "tea" is optional
app.get('/secr*et(tea)?', (req, res) => {
    res.send(`In da club`);
})

// Note: string patterns does INDEED work w/ lengthened path (rightmost, on endpoint)
//       string patterns does NOT work in conjunction w/ route parameters itself
// path needs to be '/secret/{team}/{player} format
app.get('/secr*et(tea)?/:team/:player/', (req, res) => {
    // res.send(req.params); // req.params is an obj
    // access multiple params using 'req.params' & dynamically reflect it on content body
    res.send(`You've found me ${req.params.player}, you've found me ${req.params.team}`);
    // res.send(`hello now`);
})

// GET request to any other page ...
app.get('*', (req, res) => {
    res.send(`<h1>404 Error</h1> \nNothing to see here`);
});

/* app.listen() should always be the very last thing in the server - 
although dealing w/ asynchronous JS but sequencing still mattter */
app.listen(PORT, () => {
    // console.log() w/ some string interpolation 
    console.log(`Server is runnning on PORT: ${PORT}`);
});

/* after importing Express, initializing Express to be contained in a variable "app", and
incorporating app.listen() at the very end, we had essentially established an Express server */

// "npm start" in CLI & "localhost.com/{PORT}" in browser to check"