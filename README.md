
# Map DB  

- The first thing you should do:

```sh
$ npm install
$ npm run dev
```
- Second step you need to install a PG(Postgres)
- The third you need to install a Postman

# POST querie
 - POST : http://localhost:3000/newPlacemarker , Body (x-www-form-urlencoded) looks like this
    ```sh
      Key                Value 
    $ user_id            1
    $ latitude          30.30
    $ longitude			60.4324
    $ hintContent		Hint
    $ balloonContent	<strong>Balloon</strong>
    ```

# Config DB
Need create ```sh map_db``` table

# Using placemarks
- Enter the address
- Click the button
- A label will be created on the map