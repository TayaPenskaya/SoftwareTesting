const router = require('express').Router();
const mongoose = require('mongoose');
const Table = mongoose.model('Table');
const User = mongoose.model('User');
const auth = require('../auth');

router.get('/', auth.required, function(req, res, next) {
    let limit = 20;
    let offset = 0;

    if(typeof req.query.limit !== 'undefined'){
        limit = req.query.limit;
    }

    if(typeof req.query.offset !== 'undefined'){
        offset = req.query.offset;
    }

    User.findById(req.payload.id).then(function(user){
        if (!user) { return res.sendStatus(401); }

        Promise.all([
            Table.find()
                .limit(Number(limit))
                .skip(Number(offset))
                .exec(),
            Table.count()
        ]).then(function(results){
            let tables = results[0];
            let tablesCount = results[1];

            return res.json({
                articles: tables.map(function(article){
                    return tables.toJSONFor(user);
                }),
                articlesCount: tablesCount
            });
        }).catch(next);
    });
});

router.post('/', function(req, res, next) {
    let table = new Table();

    table.seats = req.body.seats;
    table.free = req.body.seats;
    table.rake = req.body.rake;

    table.save().then(function(){
        return res.json({table: table.toJSONFor()});
    }).catch(next);
});

// Play a game on table
router.post('/:table/play', auth.required, function(req, res, next) {
    let tableId = req.table._id;

    User.findById(req.payload.id).then(function(user){
        if (!user) { return res.sendStatus(401); }

        return user.play(tableId).then(function(){
            return req.article.updateFreeSeats().then(function(table){
                return res.json({table: table.toJSONFor(user)});
            });
        });
    }).catch(next);
});

// Unplay a game on table
router.delete('/:table/play', auth.required, function(req, res, next) {
    let tableId = req.table._id;

    User.findById(req.payload.id).then(function (user){
        if (!user) { return res.sendStatus(401); }

        return user.unplay(tableId).then(function(){
            return req.article.updateFreeSeats().then(function(table){
                return res.json({table: table.toJSONFor(user)});
            });
        });
    }).catch(next);
});

module.exports = router;