
# Routes

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
