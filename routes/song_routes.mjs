/* modular router file */
import express from 'express';
// initialize running version of express.Router() into variable router
const router = express.Router();

/* middleware could be included here but it will only be specific to this router */


// define /gotham route path
router.get('/gotham', (req, res) => {
    res.send('Welcome to Gotham');
});

// create /gotham/history route path
router.get('/gotham/history', (req, res) => {
    res.send(`Gotham's history`);
});

/* router.route('/character') method used to define multiple HTTP methods for /character route
   all chained together --- an attempt to keep code modular and D.R.Y. (reduce redundancy) */
router.route('/character')
    .get((req, res) => {
        res.send('/character route path');
    })
    .post((req, res) => {
        res.send('Add new character');
    })
    .put((req, res) => {
        res.send('Update the character');
    })
    .delete((req, res) => {
        res.send('Delete the character');
    });


// export out router methods to server.mjs
export default router;