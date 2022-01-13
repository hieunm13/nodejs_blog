const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CourseSchema = new Schema({
    _id: { type: Number },
    name: { type: String, maxLength: 255, required: true, },
    description: { type: String, maxLength: 600, required: true, },
    image: { type: String, maxLength: 255 },
    slug: { type: String, maxLength: 255, slug: 'name', unique:true },
    videoId: { type: String, maxLength: 2000 },
    deletedAt: { type: Date }
}, {
    _id: false,
    timestamps: true,
});

CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc'
        });
    }
    return this;
}

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt : true });
mongoose.plugin(slug);


module.exports = mongoose.model('Course', CourseSchema);