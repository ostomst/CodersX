const Circle = require('./circle');

const circle1 = new Circle(0, 0, 1);

const circle2 = new Circle(0, 2, 1);

console.log(circle1.isOverlapped(circle2));

const circle3 = new Circle(0, 0, 3);
console.log(circle1.isOverlapped(circle3));

const circle4 = new Circle(5, 5, 1);
console.log(circle1.isOverlapped(circle4));
