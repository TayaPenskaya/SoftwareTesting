const router = require('express').Router();

router.use('/', require('./users'));
router.use('/tables', require('./tables'));

router.use(function(err, req, res, next){
    if(err.name === 'ValidationError'){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key){
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }
    if(err.name === 'UnauthorizedError'){
        return res.status(401).send('You forgot to login');
    }

    return next(err);
});

module.exports = router;