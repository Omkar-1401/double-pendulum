let pg;
function setup() {
    createCanvas(1000, 1000);
    
    pg = createGraphics(1000, 1000);
    pg.background(220);
}

var m1 = 30;
var m2 = 10;
var g = 9.8;

var l1 = 100;
var l2 = 100;

let pi = Math.PI;
var t1 = -pi / 2;
var t2 = -pi;

var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;

var t = 0;

var w1 = 0;
var w2 = 0;


var points = [];
var phase1 = [];
var phase2 = [];

function ForwardEuler(f, T0, dt, t0) {
  
    let T = T0;
    t = t0;
  
    for (let j = 0; j < 4; j++) {
            T[j] += dt * f(T, t)[j];
        }
    
    t += dt;
    // console.log(T);
    return T;
}
  
function D(sys, t) {
    let t1 = sys[0];
    let w1 = sys[1];
    let t2 = sys[2];
    let w2 = sys[3];

    return [w1, (-g * (2 * m1 + m2) * Math.sin(t1) - m2 * g * Math.sin(t1 - 2 * t2) - 2 * m2 * Math.sin(t1 - t2) * (w2 ** 2 * l2 + w1 ** 2 * l1 * Math.cos(t1 - t2))) / (l1 * (2 * m1 + m2 - m2 * Math.cos(2 * (t1 - t2)))), w2, (2 * Math.sin(t1 - t2) * (w1 ** 2 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(t1) + w2 ** 2 * l2 * m2 * Math.cos(t1 - t2))) / (l2 * (2 * m1 + m2 - m2 * Math.cos(2 * (t1 - t2))))];
}
  
  
function draw() {
  background(220);
  image(pg, 0, 0);
  
  x1 = l1 * sin(t1);
  y1 = l1 * cos(t1);

  x2 = x1 + l2 * sin(t2);
  y2 = y1 + l2 * cos(t2);


  translate(width / 4, height / 4);
  
  strokeWeight(2);
  stroke('red');
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  
  
  fill('black');
  stroke('black');
  circle(x1, y1, m1 / 2);
  circle(x2, y2, m2 / 2);
  
  soln = ForwardEuler(D, [t1, w1, t2, w2], 0.12, t);
  
  t1 = soln[0];
  w1 = soln[1];
  t2 = soln[2];
  w2 = soln[3];
  
  vect = createVector(x2 + width / 4, y2 + height / 4);
  points.push(vect);
  
  strokeWeight(1);
  stroke('black');
  if (points.length > 1) {
    let v1 = points[points.length - 1];
    let v2 = points[points.length - 2];
    pg.line(v1.x, v1.y, v2.x, v2.y);
  }
  

  vect1 = createVector(t1, w1);
  fill('red');

  phase1.push(vect1);
  if (phase1.length > 1) {
    let v3 = phase1[phase1.length - 1];
    let v4 = phase1[phase1.length - 2];
    pg.line(v3.x * 30 + 400 + width / 4, v3.y * 250 + height / 4, v4.x * 30 + 400 + width / 4, v4.y * 250 + height / 4);
  }

  circle(vect1.x * 30 + 400, vect1.y * 250, 7);
  
  stroke('red');
  circle(0, 0, 10);
  
  fill('gray');
  textFont('Corbel');
  textSize(30);
  stroke('gray');
  text('big bob', 360, 220);
  
  vect2 = createVector(t2, w2);

  phase2.push(vect2);
  
  stroke('black');
  if (phase2.length > 1) {
    let v5 = phase2[phase2.length - 1];
    let v6 = phase2[phase2.length - 2];
    pg.line(v5.x * 5 + 200 + width / 4, v5.y * 100 + 400 + height / 4, v6.x * 5 + 200 + width / 4, v6.y * 100 + 400 + height / 4);
  }

  
  fill('red');
  circle(vect2.x * 5 + 200, vect2.y * 100 + 400, 7);
  
  fill('gray');
  stroke('gray');
  text('small bob', 100, 600);
  
}