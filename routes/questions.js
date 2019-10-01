const express = require('express');
const router = express.Router();

const questionModel = require('../models/questionModel');

router.get('/', (req, res, next) => {
    try {
        questionModel.find({}, (err, questions) => {
            const sortParam = req.query.sort_by;
            if (sortParam) {
                const questionsCopy = [...questions]; // assign new copy of array instead of creating a reference
                questionsCopy.sort((a, b) => {
                    if (a[sortParam] < b[sortParam]) return -1;
                    if (a[sortParam] > b[sortParam]) return 1;
                    return 0;
                });
                res.set('Content-Type', 'application/json');
                res.status(200).send(questionsCopy);
            } else {
                res.set('Content-Type', 'application/json');
                res.status(200).send(questions);
            }
        });
    } catch (e) {
        next(e);
    }
})
    .get('/:questionId', (req, res) => {
        try {
            questionModel.find({}, (err, questions) => {
                const question = questions.filter(m => m.questionId === parseInt(req.params.questionId, 10));
                if (question.length === 0) res.status(404).send('question not found');
                else {
                    res.set('Content-Type', 'application/json');
                    res.status(200).send(question);
                }
            });
        } catch (e) {
            next(e);
        }
    })
    .post('/', (req, res) => {
        try {
            const question = new questionModel();
            question.questionId = req.body.questionId;
            question.questionText = req.body.questionText;
            question.save((err) => {
                if (err) {
                    throw err;
                } else {
                    res.set('Content-Type', 'application/json');
                    res.status(201).send(question);
                }
            });
        } catch (e) {
            next(e);
        }
    })
    .put('/:questionId', (req, res) => {
        try {
            questionModel.findOne({ 'questionId': req.params.questionId }, (err, question) => {
                if (!question) {
                    res.status(404).send('Question Id Not Found');
                } else {
                    question.questionText = req.body.questionText;
                    question.save((err) => {
                        if (err) {
                            throw err;
                        } else {
                            res.set('Content-Type', 'application/json');
                            res.status(202).send(question);
                        }
                    });
                }
            });
        } catch (e) {
            next(e);
        }
    })
    .delete('/:questionId', (req, res) => {
        try {
            questionModel.findOne({ 'questionId': req.params.questionId }, (err, question) => {
                if (!question) {
                    res.status(404).send('Question Id Not Found');
                } else {
                    question.remove((err) => {
                        if (err) {
                            throw err;
                        } else {
                            res.status(204).send("question removed Successfully");
                        }
                    });
                }
            });
        } catch (e) {
            next(e);
        }
    });

module.exports = router;