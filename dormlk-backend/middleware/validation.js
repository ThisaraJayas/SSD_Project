const mongoose = require('mongoose');

const sanitizeInput = (req, res, next) => {
    // Sanitize all string fields in body and query
    const sanitizeObject = (obj) => {
        if (obj && typeof obj === 'object') {
            Object.keys(obj).forEach(key => {
                if (typeof obj[key] === 'string') {
                    obj[key] = obj[key].replace(/[\$\\'"\;\{\}]/g, '');
                } else if (typeof obj[key] === 'object') {
                    sanitizeObject(obj[key]);
                }
            });
        }
    };

    sanitizeObject(req.body);
    sanitizeObject(req.query);
    sanitizeObject(req.params);
    
    next();
};


module.exports = { sanitizeInput };