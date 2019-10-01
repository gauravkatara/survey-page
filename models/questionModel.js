const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    questionId: {
        type: Number,
        unique: true,
        required: true
    },
    questionText: String
}, {
    timestamps: true
});

const questionModel = mongoose.model('question', questionSchema);

module.exports = questionModel;