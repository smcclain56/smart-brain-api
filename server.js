const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: DATABASE_PASSWORD,
        database: 'smart-brain'
    }
});

console.log(DATABASE_PASSWORD);
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })
//could also do it this way:
//app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.listen(process.env.PORT || 8080, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});


