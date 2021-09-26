const express = require('express')
const app = express()
const port = 3000
const _app_folder = 'dist/challenges';
var cors = require('cors');
var bodyParser = require('body-parser');

var challenges = []
app.use(bodyParser.json());

app.use(cors());

app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

app.all('/', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

app.post('/login', (req, res) => {
    if (Number(req.body.userId) > 99 && Number(req.body.userId) < 1000) {
        return res.status(200).send({
            userId: req.body.userId
         });
    } else {
        return res.status(401).send({
            message: 'UNAUTHORIZED'
         });
    }    
})

app.get('/challenges', (req, res) => {
    res.send(challenges);
})

app.post('/add', (req, res) => {
    addChallenge(req.body);
    res.send(challenges);
})

app.put('/addVote/:title', (req, res) => {
    addVote(req.params.title, req.body.userId)
    res.send(challenges);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function addChallenge(challenge) {
    flag = false;
    (challenges).forEach(ch => {
        if (ch.title === challenge.title) {
            flag = true;
        }
    });
    if (!flag) {
        challenges.push(challenge);
    }
}

function addVote(title, userId) {
    challenges.filter((ch) => {
        if (ch.title === title && !ch.usersVoted.includes(userId)) {
            ch.usersVoted.push(userId);
            ch.votes = ch.votes + 1;
        }
    });
}