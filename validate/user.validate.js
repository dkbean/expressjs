module.exports.postCreate = function (req, res, next) {
    var errors = [];

    if (!req.body.name) {
        errors.push('Name is required.');
    }

    if (!req.body.phone) {
        errors.push('Phone is required');
    }
    res.locals.trials=0;
    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        });
        res.locals.trials+=1;
        return;
    }

    res.locals.success=true;

    next();

}