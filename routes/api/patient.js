const express = require('express')
const router = express.Router()
const Patient = require('../../models/patient');
const validateInputs = require('../../validation/students');
const passport = require('passport');

/*
@req: post
@route: /api/patients/create
@description: create a new student
@access: private
*/
router.post('/create',
    // passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        console.log(Patient)
        const { errors, errorsFound } = validateInputs(req.body);

        if (errorsFound) {
            return res.status(400).json(errors);
        }

        const patientData = {};
        patientData.full_name = req.body.full_name;
        patientData.phone = req.body.phone;
        patientData.email = req.body.email;
        patientData.birth_date = req.body.birth_date;
        patientData.location = req.body.location;
        patientData.stage = req.body.stage;
        patientData.level = req.body.level;

        const patient = new Patient(patientData);
        patient.save()
            .then(() => res.status(201).json(patient))
            .catch(err => res.status(400).json(err));

    });

/*
@req: post
@route: /api/patients/search
@description: search form for students
@access: private
*/

router.post('/search',
    // passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        Patient.find({})
            .then(result => res.status(200).json(result))
            .catch(() => res.status(404).json({ notFound: 'Patient doesn\'t exist' }));
    });


/*
@req: get
@route: /api/patients/:patient_id
@description: find student by id
@access: private
*/
router.get('/:patient_id',
    // passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        Patient.findById(req.params.patient_id)
            .then(result => res.status(200).json(result))
            .catch(() => res.status(404).json({ notFound: 'Patient doesn\'t exist' }));
    });

/*
@req: put
@route: /api/patients/:patient_id
@description: update student by id
@access: private
*/
router.put('/:patient_id',
    // passport.authenticate('jwt', { session: false }), 
    (req, res) => {

        // const { errors, errorsFound } = validateInputs(req.body);

        // if (errorsFound) {
        //     return res.status(400).json(errors);
        // }

        Patient.findOneAndUpdate({ _id: req.params.patient_id }, { $set: req.body }, { new: true, useFindAndModify: false })
            .then(result => {
                if (result) { return res.status(200).json(result); }
                else { return res.status(404).json({ notFound: 'Patient not found' }); }
            })
            .catch(err => res.status(400).json(err));

    });

/*
@req: delete
@route: /api/patients/:patient_id
@description: delete student by id
@access: private
*/
router.delete('/:patient_id',
    // passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        Patient.findByIdAndDelete(req.params.patient_id)
            .then(() => res.status(200).json({ msg: 'Patient deleted successfully' }))
            .catch(err => res.status(400).json(err));
    });


module.exports = router