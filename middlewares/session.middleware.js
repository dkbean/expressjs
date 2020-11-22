const shortid = require('shortid');
const db = require('../db');

module.exports = function (req, res, next) {

    if (!req.signedCookies.sessionID) {
        var sessionID = shortid.generate();
        res.cookie('sessionID', sessionID, {
            signed: true
        });
        db.get('sessions').push({
            id: sessionID
        }).write();
    }

    next();
}