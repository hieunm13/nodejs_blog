const res = require('express/lib/response');

class NewsController {
    index(req, res) {
        res.render('news');
    }

    // /news/:slug
    show(req, res) {
        res.send('News Detail!!!');
    }
}

module.exports = new NewsController();
