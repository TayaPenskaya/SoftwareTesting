# Express + Node.js + MongoDB

## Methods API

* register user: ```curl -H "Content-Type: application/json" -d '{"username":"name", "password":"pass"}' http://localhost:port/api/users/register```
* login: ```curl -H "Content-Type: application/json" -H "Authorization: Bearer ${TOKEN}" -d '{"username":"name", "password":"pass"}' http://localhost:port/api/users/login```
* create new table:  ```curl -H "Content-Type: application/json" -H 'Authorization: Bearer ${TOKEN}' -d '{"seats":10, "rake":5}' http://localhost:port/api/tables```
* get all tables: ```curl -i -H "Accept: application/json" -H "Content-Type: application/json" -H 'Authorization: Bearer ${TOKEN}' -X GET http://localhost:port/api/tables```
* play on table: ```curl -H "Content-Type: application/json" -H 'Authorization: Bearer ${TOKEN}' -d '{"table":{"id":"table_id"}}' http://localhost:port/api/tables/table_id/play ```
* unsubscribe from table: ```curl -X DELETE -H "Content-Type: application/json" -H 'Authorization: Bearer ${TOKEN}' -d '{"table":{"id":"table_id"}}' http://localhost:port/api/tables/table_id/play```

* mongo:
```
> mongo
> show databases
> use poker
> show collections
> show users
> db.users.find()
> db.tables.find()
```

## Полезные ссылки

* [JWT](https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/)
* [Lib for JWT in Express](https://github.com/auth0/express-jwt)
* [Mongoose](https://mongoosejs.com/docs/index.html)
* [Passport](https://www.npmjs.com/package/passport)
* [JWT docs](https://www.npmjs.com/package/jsonwebtoken)
* [Article about JWT && NodeJs](https://bezkoder.com/node-js-mongodb-auth-jwt/)