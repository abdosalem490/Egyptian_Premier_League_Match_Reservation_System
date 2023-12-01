const BaseJoi = require('joi');     // for validation of the fields of the database
const sanitizeHtml = require('sanitize-html');  // for removing unwanted html and css tags from the input to prevent XSS vulnerabilities in web applications

// 
const extension = (joi) => {
    return {
        type: 'string', // The type of schema. Can be a string, or a regular expression that matches multiple types.
        base: joi.string(), //The base schema to extend from. This key is forbidden when type is a regular expression.
        messages : {    // A hash of error codes and their messages.  
            'string.escapeHTML': '{{#label}} must not include HTML!' 
        },

        rules: { // A hash of validation rule names and their implementation where:
            escapeHTML: {
                validate(value, helpers) {      // A function with signature function (value, helpers) {} that performs base validation on the input value where:
                    const clean = sanitizeHtml(value, { // using the library called sanitize-html
                        allowedTags: [ ],
                        allowedAttributes: {},
                      });
                      
                      // check if input same as the output of sanitize html
                      if (clean !== value) return helpers.error('string.escapeHTML', { value });
                      return clean;
                }
            }
        }

    }
}

const Joi = BaseJoi.extend(extension);


// create the validation schema for the users
module.exports.userSchema = Joi.object({
    
});