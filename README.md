# seebigs-extend

Does a deep extend and clone of whatever params are passed. The first argument is mutated. Undefined values are ignored.

```js
var extend = require('seebigs-extend');

var obj = {
    a: {
        b: 1,
        c: 1,
    }
};

extend(obj, {
    a: {
        c: 2,
        d: 2,
    }
});

/* obj ===
{
    a: {
        b: 1,
        c: 2,
        d: 2,
    }
}
*/
```

Properties on the extended objects are cloned with the following behavior:
*   Unclonable values are assigned outright (String, Boolean, Number, Null, Undefined, Window)
*   Plain Objects inherit the same prototype then recursively deep copy each property
*   Arrays clone all values into a new array
*   Some objects are mostly-cloned but will report as [object Object] (HTMLCollections)
*   Sometimes we choose not to clone for simplicity and return same value (Date, RegExp)
