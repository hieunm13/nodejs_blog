const res = require('express/lib/response');

const Course = require('./models/Course');

const { mongoosetoObject } = require('../../util/mongoose');

class CourseController {
    //COURSE/:SLUG
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
        .then(course => 
            res.render('courses/show', { course: mongoosetoObject(course) })
        )
        .catch(next)
    }

    create(req, res, next) {
        res.render('courses/create');
    }

    store(req, res, next) {
        const formData = { ...req.body };
        formData.image = 'https://cdn.fullstack.edu.vn/f8-production/courses/6.png';
        const course = new Course(req.body);
        course.save()
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
        .then(course => res.render('courses/edit', { course: mongoosetoObject(course) }),)
        .catch(next);
    }

    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
    }

    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: {$in: req.body.courseIds } })
                .then(() =>  {
                    res.redirect('back');
                    response.setHeader("Content-Type", "text/html");
                })
                .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' })
        }
    }
}

module.exports = new CourseController();
