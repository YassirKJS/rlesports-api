const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// users: array of objects
const db = {
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
      password: 'muffins',
      comments: 0,
      joined: new Date(),
    }
  ]
}

// basic test route
app.get('/', (req, res) => {
  res.send(db.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === db.users[0].email && req.body.password === db.users[0].password)  {
    res.json('success');  
  }
  else {
    res.status(400).json('error logging in');
  }
})

app.post('/signup', (req, res) => {
  const {username, email, password} = req.body;
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




/*

*********Routes***********
/                 --> res  => this is working
/signin           --> POST => success/fail
/signup           --> POST => user
/profile/:userId  --> GET  => user
/comments         --> PUT  => user (comments count)


POST request : localhost:3010/signin
  Body/raw
    {
      "email": "rlesports.feed@gmail.com",
      "password": "banana"
    }
  
  => Params
      "success"


POST request: localhost:3010/signup
  Body/raw
    {
      "username": "feed",
      "email": "rle.feed@gmail.com",
      "password": "squishy"
    }
  
  => Params
      {"id":"125","username":"feed","email":"rle.feed@gmail.com","password":"squishy","comments":0,"joined":"2019-10-08T16:18:06.114Z"}


GET request:  localhost:3010/profile/123
  => Params
      {"id":"123","username":"rlesports","email":"rlesports.feed@gmail.com","password":"banana","comments":4,"joined":"2019-10-08T16:44:56.003Z"}

PUT request:  localhost:3010/comments
  Body/raw
    {
      "id": "123"
    }

  => Params
     1 then 2 then 3 etc

*/