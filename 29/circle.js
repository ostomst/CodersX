/* eslint-disable no-restricted-properties */
const Math = require('math');

module.exports.Circle = (x, y, radius) => {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isOverlapped = function (c) {
        const d = Math.sqrt(Math.pow(this.x - c.x, 2) + Math.pow(this.y - c.y, 2));
        if (d === this.r + c.r) {
            return 0;
        }
        if (d < this.r + c.r) {
            return -1;
        }
        return 1;
    };
};
