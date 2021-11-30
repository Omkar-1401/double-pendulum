

var m1 = 30;
var m2 = 10;
var g = 10;

var l1 = 100;
var l2 = 150;

let pi = Math.PI;
var t1 = pi;
var t2 = -pi / 2;

var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;

var alpha1 = 0;
var alpha2 = 0;

var w1 = 0;
var w2 = 0;



var points = [];


function setup() {
    createCanvas(600, 600);
    frameRate(20);

}

function draw() {
    background(220);
    x1 = l1 * sin(t1);
    y1 = l1 * cos(t1);

    x2 = x1 + l2 * sin(t2);
    y2 = y1 + l2 * cos(t2);
    
    
    translate(width / 2, 2 * height / 5);
    line(0, 0, x1, y1);
    line(x1, y1, x2, y2);
    circle(x1, y1, m1);
    circle(x2, y2, m2);

    alpha1 = (-g * (2 * m1 + m2) * sin(t1) - m2 * g * sin(t1 - 2 * t2) - 2 * m2 * sin(t1 - t2) * (w2 ** 2 * l2 + w1 ** 2 * l1 * cos(t1 - t2))) / (l1 * (2 * m1 + m2 - m2 * cos(2 * (t1 - t2)))); 
    alpha2 = (2 * sin(t1 - t2) * (w1 ** 2 * l1 * (m1 + m2) + g * (m1 + m2) * cos(t1) + w2 ** 2 * l2 * m2 * cos(t1 - t2))) / (l2 * (2 * m1 + m2 - m2 * cos(2 * (t1 - t2)))); 

    w1 += alpha1;
    w2 += alpha2;

    t1 += w1;
    t2 += w2;

    vect = createVector(x2, y2);
    points.push(vect);
  
    strokeWeight(1);
    for (let i = 1; i < points.length; i++) {
        let v1 = points[i - 1];
        let v2 = points[i];
        line(v1.x, v1.y, v2.x, v2.y);
    }
 
}