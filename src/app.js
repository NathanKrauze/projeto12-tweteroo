import express, { json } from 'express';
import cors from 'cors';

const users = [];

const tweets = [];

let logged = false;


const app = express();
app.use(cors());
app.use(json());

app.post('/sign-up', (req, res) => {

    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(422).send("dados incompletos ou inválidos")
        return
    };

    users.push({
        username: username,
        avatar: avatar
    });

    logged = true;

    res.status(201).send('OK');
});

app.post('/tweets', (req, res) => {

    const { username, tweet } = req.body;

    if (!logged) {
        res.status(401).send("UNAUTHORIZED");
        return;
    };

    if (!username || !tweet) {
        res.status(422).send("informações incompletas ou inválidas");
        return;
    };

    tweets.push({
        username: username,
        tweet: tweet
    });

    const tweetAvatar = users.filter(user => {
        if (user.username === username) {
            return user.avatar;
        };
    })

    res.status(201).send("OK")
});

app.get('/tweets', (req, res) => {

    const reverseTweets = [...tweets];
    reverseTweets.reverse();

    const sendTweets = []

    reverseTweets.forEach((twt, i) => {
        if (i >= 10) {
            return;
        };

        const tweetAvatar = users.find(user => {
            if (user.username === twt.username) {
                return user;
            };

        })

        sendTweets.push({
            username: twt.username,
            avatar: tweetAvatar.avatar,
            tweet: twt.tweet
        })

    });

    res.status(201).send(sendTweets);
});

app.listen(5000);