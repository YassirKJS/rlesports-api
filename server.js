const express = require('express');

const app = express();

// basic test route
app.get('/', (req, res) => {
  res.send('this is working');
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

*/