const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const cors = require('cors'); // Cross-Origin Resource Sharing
const knex = require('knex'); // http://knexjs.org/#Installation

const db = knex({
  client: 'pg', // postgres
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'zenrae',
    database : 'rlesportsDB'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// users: array of objects
const database = {
  users: [
    {
      id: '123',
      username: 'rlesports',
      email: 'rlesports.feed@gmail.com',
      password: 'banana',
      comments: 0,
      joined: new Date(),
    },
    {
      id: '124',
      username: 'Yassir',
      email: 'khchafyassir12@gmail.com',
      password: 'muffin',
      comments: 0,
      joined: new Date(),
    }
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'rlesports.feed@gmail.com'
    }
  ]
}

// basic test route
app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login').where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users').where('email', '=', req.body.email)        
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('err: unable to get user'))
      }
      else {
        res.status(400).json('err: wrong credentials');
      }
    })
    .catch(err => res.status(400).json('err: wrong credentials'))  
})

app.post('/signup', (req, res) => {
  const {username, email, password} = req.body;   

  const hash = bcrypt.hashSync(password, saltRounds); 

  // we create a transaction trx when we have to do more than two things at once.
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users').returning('*').insert({ // returning('*') replaces select * after the insert
      email: loginEmail[0],
      username: username,
      joined: new Date()
    })
      .then(user => {  // user[] is the response
        res.json(user[0]);
      })      
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('error: unable to sign up.'));
}) 

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id: id })
    .then(user => { 
      if (user.length) {
        res.json(user[0]);
      }
      else {
        res.status(400).json('error: user not found');
      }
    })
    .catch(err => res.status(400).json('error: user not found'));
})


/*  see: https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/learn/lecture/8862368#questions
app.put('/comments', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.comments++;
      return res.json(user.comments);
    }
  })
  if (!found) {
    res.status(404).json('no such user');
  }
})
*/


app.listen(3010, () => {
  console.log('app is running on port 3010');
});


// CORS read more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS