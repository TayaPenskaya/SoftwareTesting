# Express + Node.js + MongoDB

## Как пользоваться:

* создать юзера: ```curl -H "Content-Type: application/json" -d '{"username":"asd", "password":"asd"}' http://localhost:8080/api/users```
* создать стол: ```curl -H "Content-Type: application/json" -d '{"seats":10, "rake":5}' http://localhost:8080/api/tables```
* c mongo:
```
> mongo
> show databases
> use poker
> show collections
> show users
> db.users.find()
> db.tables.find()
```
* залогиниться ```curl -H "Content-Type: application/json" -d '{"username":"asd", "password":"asd"}' http://localhost:1234/api/users/login```

## Полезные ссылки

* [JWT](https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/)
* [Lib for JWT in Express](https://github.com/auth0/express-jwt)
* [Mongoose](https://mongoosejs.com/docs/index.html)
* [Passport](https://www.npmjs.com/package/passport)
* [JWT docs](https://www.npmjs.com/package/jsonwebtoken)
* [Article about JWT && NodeJs](https://bezkoder.com/node-js-mongodb-auth-jwt/)