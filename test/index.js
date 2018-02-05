var extend = require('../index.js');

var allPassed = true;

function describe (description, assertions) {
    assertions(description);
}

function shouldEqual (actual, expected, desc) {
    if (actual !== expected) {
        allPassed = false;
        console.log('\n' + desc + '\n   expected ' + JSON.stringify(actual) + ' to be ' + JSON.stringify(expected));
    }
}

function toString(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1).toLowerCase();
}


describe('combines properties from both into one object', (desc) => {
    var returnedObj = extend({ bat: 'man' }, { bat: 'girl', super: 'man', spider: 'man' });
    shouldEqual(returnedObj.bat, 'girl', desc);
    shouldEqual(returnedObj.super, 'man', desc);
    shouldEqual(returnedObj.spider, 'man', desc);
});

describe('modifies the first object directly', (desc) => {
    var obj = { bat: 'man' };
    extend(obj, { super: 'man' });
    extend(obj, { sand: 'man' });
    shouldEqual(obj.bat, 'man', desc);
    shouldEqual(obj.super, 'man', desc);
    shouldEqual(obj.sand, 'man', desc);
});

describe('handles undefined', (desc) => {
    shouldEqual(extend(), void 0, desc);
    var keys = Object.keys(extend({}, void 0, { a:1 }));
    shouldEqual(keys.length, 1, desc);
    shouldEqual(keys[0], 'a', desc);
});

describe('handles null', (desc) => {
    shouldEqual(extend(null), null, desc);
    var keys = Object.keys(extend({}, null, { a:1 }));
    shouldEqual(keys.length, 1, desc);
    shouldEqual(keys[0], 'a', desc);
});

describe('clones every property the way we want', (desc) => {
    var goodMe = {
        undef: void 0,
        booltrue: true,
        boolfalse: false,
        nll: null,
        num: 123,
        str: 'stringy',
        obj: {
            foo: 'bar',
            nested: {
                a: 123,
                b: 456,
            },
        },
        arr: [
            { c: 123 },
            { d: 456 },
        ],
        fn: () => {},
        date: new Date(),
        args: arguments,
    };

    var evilMe = extend({}, goodMe);
    shouldEqual(typeof evilMe, typeof goodMe, desc);

    evilMe.num = 666;
    evilMe.obj.nested.a = 666;
    evilMe.arr[0].c = 666;

    shouldEqual(goodMe.num, 123, desc);
    shouldEqual(evilMe.num, 666, desc);
    shouldEqual(Object.getPrototypeOf(evilMe).num, void 0, desc);

    shouldEqual(goodMe.obj.nested.a, 123, desc);
    shouldEqual(evilMe.obj.nested.a, 666, desc);

    shouldEqual(goodMe.arr[0].c, 123, desc);
    shouldEqual(evilMe.arr[0].c, 666, desc);

    shouldEqual(evilMe.booltrue, true, desc);
    shouldEqual(evilMe.boolfalse, false, desc);
    shouldEqual(evilMe.nll, null, desc);
    shouldEqual(evilMe.str, 'stringy', desc);
    shouldEqual(typeof evilMe.fn, 'function', desc);
    shouldEqual(toString(evilMe.date), 'date', desc);
    shouldEqual(toString(evilMe.args), 'arguments', desc);
});


if (allPassed) {
    console.log('\nAll Passed!\n');
} else {
    console.log('\nFAIL\n');
    process.exit(1);
}
