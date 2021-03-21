const validator = require('validator');
const IsEmpty = require('./IsEmpty');

const validateStudentInputs = (data) => {
    let errors = {};
    let errorsFound;

    data.full_name   = IsEmpty(data.full_name)   ? '' : data.full_name; 
    data.national_id = IsEmpty(data.national_id) ? '' : data.national_id; 
    data.phone       = IsEmpty(data.phone)       ? '' : data.phone; 
    data.birth_date  = IsEmpty(data.birth_date)  ? '' : data.birth_date; 
    data             = IsEmpty(data)             ? '' : data; 
    


    // student full name validation
    if(validator.isEmpty(data.full_name)) {
        errors.full_name = 'Enter Patient\'s Full Name';
    }

    // patient national id validation
    if(!validator.isLength(data.national_id, {min:1, max:12})) {
        errors.national_id = 'Patient ID Must Be Exactly 14 Digits';
    }

    // patient number validation
    if(!validator.isLength(data.phone, {min:6})) {
        errors.phone = 'Phone Number Must Be At Least 6 Digits'
    }
    
    if(validator.isEmpty(data.phone)) {
        errors.phone = 'Enter Patient\'s Phone Number';
    }

    // patient email validation
    if(data.email !== undefined) {
        if(!validator.isEmail(data.email)) {
            errors.email = 'Email Address Is Not Valid';
        }
    }

    if(validator.isEmpty(data.national_id)) {
        errors.national_id = 'Enter Patient ID';
    }

    // birth date validation
    //if(validator.isEmpty(data.birth_date)) {
    //    errors.birth_date = 'Enter Patient\'s Birth Date';
    //}

    if(validator.isAfter(data.birth_date, `${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}` )) {
        errors.birth_date = 'Birth date is not valid';
    }

    // student stage validation
    if(validator.isEmpty(data.stage)) {
        errors.stage = 'Select Patient\'s Stage';
    }

    // student level validation
    if(validator.isEmpty(data.level)) {
        errors.level = 'Select Patient\'s Level';
    }
    
    return {
        errors: errors,
        errorsFound: !IsEmpty(errors)
    }

}

module.exports = validateStudentInputs;