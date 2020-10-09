const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/hooter');
const hoots = db.get('hoots');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'hello :)'
    });
});

app.get('/hoots', (req, res) => {
    hoots
        .find()
        .then(hoots => {
            res.json(hoots);
        });
});

function isValidHoot(hoot){
    return hoot.name && hoot.name.toString().trim() !== '' &&
        hoot.content && hoot.content.toString().trim() !== '';
}

app.post('/hoots', (req, res) => {
    console.log(req.body);
    if(isValidHoot(req.body)){
        // insert to db
        const hoot = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        hoots
            .insert(hoot)
            .then(createdHoot => {
                res.json(createdHoot);
            });

    } else{
        res.status(422);
        res.json({
            message: 'Hey! Name and content are required!'
        });
    }
});

app.listen(5000, () => {
    console.log('listening on http://localhost:5000');
});