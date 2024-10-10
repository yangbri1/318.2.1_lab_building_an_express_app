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
// GET request to /about page ...
app.get('/about', (req, res) => {
    res.send(`Don't forget about us...`);
});
// GET request to any other page ...
app.get('*', (req, res) => {
    res.send(`404 Error: Nothing to see here`);
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