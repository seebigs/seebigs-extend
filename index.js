var each = require('seebigs-each');

var arrSlice = Array.prototype.slice;
var hasProp = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

/**
 * Returns a deep clone of whatever you pass it, with the following behavior:
 *   Unclonable values return themselves (String, Boolean, Number, Null, Undefined, Window)
 *   Plain Objects inherit the same prototype then copy over each property
 *   Arrays copy all values into a new array
 *   HTMLCollections are properly cloned but will report as [object Object]
 *   Sometimes we choose not to clone for simplicity and return same value (Date, RegExp)
 */
function clone(thing) {
    var type = toString.call(thing).split(' ').pop();

    // Some types should return early with exact value
    if (!thing || thing === thing.window) {
        return thing;
    }

    if (type === 'Object]' || type === 'Array]' || type === 'HTMLCollection]') {
        var ret = Array.isArray(thing) ? [] : Object.create(Object.getPrototypeOf ? Object.getPrototypeOf(thing) : thing.__proto__);
        for (var key in thing) {
            if (hasProp.call(thing, key)) {
                if (typeof thing[key] !== 'undefined' && thing !== thing[key]) { // recursion prevention
                    ret[key] = clone(thing[key]);
                }
            }
        }

        return ret;
    }

    return thing;
}

/**
 * mutates first argument
 * ignores undefined values
 */
function extend() {
    var ret = arguments[0];

    each(arrSlice.call(arguments, 1), function(ext) {
        each(ext, function(val, key) {
            if (typeof val !== 'undefined') {
                ret[key] = clone(val);
            }
        });
    }, this);

    return ret;
}

module.exports = extend;
