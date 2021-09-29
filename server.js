const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const _app_folder = 'dist/challenges';
var cors = require('cors');
const key = '6a53f73899b6dd1660250db02fce037388a513321a41ad5804be4091e89d0e5c41ef5cc2613c40445258689f01889f86e7ecbe7818b1ee2cfe98c982425f82af';

var challenges = []
app.use(express.json());

//app.use(cors());

app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

app.all('/', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});


app.post('/login', (req, res) => {
    if (Number(req.body.userId) > 99 && Number(req.body.userId) < 1000) {
        const userId = req.body.userId
        const accessToken = jwt.sign({ userId: userId }, key, { expiresIn: '120s'});
        res.status(200).json({token: accessToken});
    } else {
        return res.status(401).send({
            message: 'UNAUTHORIZED'
         });
    }    
})

app.get('/challenges', authenticateToken, (req, res) => {
    res.send(challenges);
})

app.post('/add', authenticateToken, (req, res) => {
    addChallenge(req.body);
    res.send(challenges);
})

app.put('/addVote/:title', authenticateToken, (req, res) => {
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

function authenticateToken(req, res, next) {
    const auth = req.headers['token']
    const token = auth && auth.split(' ')[1];
    if (token == null) return res.status(401).send({ message: 'UNAUTHORIZED' });
    jwt.verify(token, key, (err, data) => {
        if(err){
            res.status(403)
            next(req)
        } 
        req.user = data;
    })
    next()
}
