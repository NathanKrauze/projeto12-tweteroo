import express, { json } from 'express'
import cors from 'cors'

const users = [
    {
        username: 'bobesponja', 
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png"      
    }
]

const tweets = [
    {
        username: "bobesponja",
        tweet: "Eu amo hambúrguer de siri!"
    }
]


const app = express()
app.use(cors())
app.use(json())

app.post('/sign-up', (req, res) => {

    const {username, avatar } = req.body;

    if(!username || !avatar){
        res.status(422).send("dados incompletos ou inválidos")
        return
    }

    users.push({
        username: username,
        avatar: avatar
    })

    console.log(users)
    res.send('OK')
})

app.listen(5000)