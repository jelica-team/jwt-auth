
# JWT Auth  

- The first thing you should do:

```sh
$ npm install
$ npm run dev
```
- Second step you need to install a PG(Postgres)
- The third you need to install a Postman

# GET & POST queries
 - POST : http://localhost:3000/seedUser , Body (x-www-form-urlencoded) looks like t his 
    ```sh
      Key                Value 
    $ email             test@test.com
    $ password          password
    ```
 - POST : http://localhost:3000/getToken
 When you GET tour token.
You will receive a string with an authorization code, you need to select the Authorization tab in Postman and in the Type field select Bearer Token. Next you can check your TOKEN.
 - GET : http://localhost:3000/protected
You will see the inscription "I'm protected"

# Config DB
Is in knexDb fields in index.js and in knexfile.js.
Later this will be changed to a more understandable form.