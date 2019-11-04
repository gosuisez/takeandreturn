/* Validator */

/* Imports */
import constraints from '@app/validation/constraints';
import validate from 'validate.js';
/* /Imports/ */

const validator = (field, value) => {
    let object = {};
    object[field] = value;

    let constraint = constraints[field];

    const result = validate(object, { [field]: constraint });

    if (result) {
        return result[field][0];
    }

    return null;
};

export default validator;

/* /Validator/ */
