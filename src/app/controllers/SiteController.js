const res = require('express/lib/response');

const Course = require('./models/Course');

const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    index(req, res, next) {
        // Course.find({}, function(err, courses) {
        //     if (!err) {
        //         res.json(courses);
        //         return;
        //     } 
        //     res.status(400).json({ error: 'ERROR!' });
        // })

        Course.find({})
        .then(courses => {
            res.render('home', { courses: multipleMongooseToObject(courses) })
        } )
        .catch(next)
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
