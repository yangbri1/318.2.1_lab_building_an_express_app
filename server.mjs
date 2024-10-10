// console.log("Hello World!");
// 1. create server.mjs file
// 2. npm init -y - create package.json
// 3. correct package.json
// 4. npm i express - download express 
// 5. import express at top of page
// 6. initialize express into a variable
// 7. listen to express(app) at the BOTTOM of the page

// import Express (build on top of Node)
import express from 'express';
// import router module into app
import song_routes from './routes/song_routes.mjs';


// import morgan 3rd party middleware ("express.logger" built-in fn DN work)
import morgan from 'morgan';

// import filesystem module (built-in Node module) into main app file -- used in creating a template engine
import fs from 'fs';

// create an instance of express() & cache it to "app" variable
const app = express();
const PORT = 3000;

/* FINAL STEP IN TEMPLATE ENGINE:  */
app.use(express.static('./styles'));

// creating template engine (BOILERPALTE w/o replace block) -- accessing w/ extension of "sbinalla"
app.engine('sbinalla', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        // error handling if there's any error execute callback function
        if (err) return callback(err);

        // takes template, convert to string, fill in selected portions w/ inputted content (dynamic), returns value
        const rendered = content
            .toString()
            .replaceAll('#title#', `${options.name}`)
            .replace('#description#', `${options.description}`)
            .replace('#summary#', `${options.summary}`)
            .replace('#img', `${options.img}`);

        
        return callback(null, rendered);

    });
});

// Express .set() method -- necessary intermediary in template engine step
app.set("views", "./views");    // specifies the file "views" to path "./views" (directory where view template exist)
app.set("view engine", "sbinalla"); // registers above newly created "view engine" /w "sbinalla" extension


// middleware functions -- within HTTP request method b/t path URL & route handler
// https://expressjs.com/en/resources/middleware.html
// https://expressjs.com/en/4x/api.html#app.METHOD
// https://retrodevs.medium.com/express-js-logger-middleware-a-quick-and-easy-guide-6b79a14ea164

// custom middleware logging info & when HTTP request was made
app.use((req, res, next) =>{
    req.time = new Date(Date.now()).toString();
    // print out to terminal
    console.log(req.method,req.hostname, req.path, req.time);
    next(); // necessary to invoke next() to move towards next handler function, otw it ends here
});

// built on top of Node.js (like Express), Morgan API console.log() out HTTP requests onto terminal
app.use(morgan('combined'));

// error handling middleware using industry standard anonymous arrow function
/* Note: error handling middleware has 4 params that ALL needs to be filled w/ something */
app.use((err, req, res, next) => {
    console.log(err.stack);
    // res.status(600).send(err.message);
    /* here we created a custom error code 600 w/ message if it hits */
    res.status(600).send(`It's bwoken, it's bwoken!`);
});


// Express routes' structure -- most to least specific in route order
/* instance.method(URL path on server, handler function to execute when route is matched) */

// when user makes GET request to root/homepage
app.get('/', (req, res) => {
    // shows this message
    // res.send('Hello from the other side...');

    // specify the options
    let options = {
        name: '\tDark Knight',
        description: 'Vigilante',
        summary: 'Protector of Gotham City, fights against evil and strikes fear into hearts of criminals ...',
        img: 'https://i.pinimg.com/736x/be/02/b4/be02b43e91eba5f496a83e065336f26f.jpg'
    };

    /* IMPORTANT: call res.render() in EACH of app's routes so view could be rendered */
    res.render('template', options);
});

// GET method route -- request to /about page ...
app.get('/about', function (req, res) {
    res.send(`Don't forget about us...`);
});

// route path matching requests to /secret page ... (w/ some regex)
// any number of string literals could be b/t "secr" & "et" and it will run, also "tea" is optional
app.get('/secr*et(tea)?', (req, res) => {
    res.send(`In da club`);
});

// Note: string patterns does INDEED work w/ lengthened path (rightmost, on endpoint)
//       string patterns does NOT work in conjunction w/ route parameters itself
// path needs to be '/secret/{map}/{race} format
app.get('/secr*et(tea)?/:map/:race/', (req, res) => {
    // res.send(req.params); // req.params is an obj
    // access multiple params using 'req.params' & dynamically reflect values cached in req.params obj
    res.send(`You've selected ${req.params.race} on the ${req.params.map} map.`);
    // res.send(`hello now`);
});

// GET request for attempting to navigate towards any child path of /about ...
app.get('/about/*', (req, res, next) => {
    console.log('This prints out in the terminal')
    next() // invoking next() object will point to the next callback function
}, (req, res) => {
    // res.send('Come again?');
    // route .redirect() method back to URL path /about
    res.redirect('/about');
});

// GET request to any other page ...
app.get('*', function (req, res) {
    res.send(`<h1>404 Error</h1> \nNothing to see here`);
});

// app.route('/character')
//     .get((req, res) => {
//         res.send('/character route path');
//     })
//     .post((req, res) => {
//         res.send('Add new character');
//     })
//     .put((req, res) => {
//         res.send('Update the character');
//     })
//     .delete((req, res) => {
//         res.send('Delete the character');
//     });

/* app.route()'s placement normally here unless in another module ... also chainable */
// load router module in app  -- now can handle requests to /secret and /secret/about
app.use('/song_routes', song_routes);

/* app.listen() should always be the very last thing in the server - 
although dealing w/ asynchronous JS but sequencing still mattter */
app.listen(PORT, () => {
    // console.log() w/ some string interpolation 
    console.log(`Server is runnning on http://localhost:${PORT}`);
});

/* after importing Express, initializing Express to be contained in a variable "app", and
incorporating app.listen() at the very end, we had essentially established an Express server */

// "npm start" in CLI & "localhost.com/{PORT}" in browser to check"