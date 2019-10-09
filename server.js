const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// users: array of objects
const db = {
  users: [
    {
      id: '123',
      username: 'rlesports',
      email: 'rlesports.feed@gmail.com',
      comments: 0,
      joined: new Date(),
    },
    {
      id: '124',
      username: 'Yassir',
      email: 'khchafyassir12@gmail.com',
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
  res.send(db.users);
})

app.post('/signin', (req, res) => {
  // bcrypt.compareSync("not_bacon", hash);
  if (req.body.email === db.users[0].email && req.body.password === db.users[0].password)  {
    res.json('success');  
  }
  else {
    res.status(400).json('error logging in');
  }
})

app.post('/signup', (req, res) => {
  const {username, email, password} = req.body;   
  // const hash = bcrypt.hashSync(password, saltRounds); 
  db.users.push(
    {
      id: '125',
      username: username,
      email: email,
      password: password,
      comments: 0,
      joined: new Date(),
    }
  );
  res.json(db.users[db.users.length - 1]);
}) 

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(404).json('no such user');
  }
})

app.put('/comments', (req, res) => {
  const { id } = req.body;
  let found = false;
  db.users.forEach(user => {
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


app.listen(3010, () => {
  console.log('app is running on port 3010');
});


