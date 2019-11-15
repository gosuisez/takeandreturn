/* Imports */
import validate from 'validate.js';
import constraints from '@app/validation/constraints';
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

/* Exports */
export default validator;
/* /Exports/ */
