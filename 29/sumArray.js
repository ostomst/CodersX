const math = require('math');


module.exports.sumArray = function sumArray(arr) {
    return arr.reduce((sum, element) => math.add(sum, element));
}

