import 'dotenv/config';
import * as exercise from './exercise_model.mjs';
import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const PORT = 3000;

const app = express();

app.use(express.json());

const { body, validationResult } = require('express-validator');


/**
 * Create a new exercise.
 */
app.post('/exercises', 
    body('name').isString().notEmpty(),
    body('reps').isInt({min: 1}),
    body('weight').isInt({min: 1}),
    body('unit').isIn(['kgs', 'lbs']),
    body('date').matches(/^\d\d-\d\d-\d\d$/),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Error: "Invalid request" });
        }

        exercise.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(exercise => {
                res.status(201).json(exercise);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: "Invalid request" });
            });
});


/**
 * Retrieve all exercises. 
 */
 app.get('/exercises', (req, res) => {
    let filter = {}
    exercise.retrieveExercises(filter, '', 0)
        .then(exercise => {
            res.status(200).send(exercise);
        });
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    exercise.findExerciseById(req.params._id)
        .then(exercise => {
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: "Not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid equest" });
        })
});


/**
 * Update the exercise whose id is provided in the path parameter.
 */
app.put('/exercises/:_id',
    body('name').isString().notEmpty(),
    body('reps').isInt({min: 1}),
    body('weight').isInt({min: 1}),
    body('unit').isIn(['kgs', 'lbs']),
    body('date').matches(/^\d\d-\d\d-\d\d$/),

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Error: "Invalid request" });
        }

    exercise.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid request' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters.
 */
app.delete('/exercises/:_id', (req, res) => {
    exercise.deleteById(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: 'Not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.send({ Error: 'Invalid request' });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});