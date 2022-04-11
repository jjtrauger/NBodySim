//function setTimer() {
//  setInterval(movePlanets, 60);
//}

//function movePlanets() {

//}

var plutodist = 5900000000000
var G = 6.6743e-11
var unit = "meters"

var bodies = [];

var earth = [];
earth[0] = (4.4745 * (10**12)); //x pos
earth[1] = 0; //y pos
earth[2] = "star"; //class of body: used to find out what colors to use
earth[3] = 0;
earth[4] = 5700; //initial y velocity
earth[5] = 1.024 * (10**(29)) //neptune mass in kg

var sun = [];
sun[0] = 0;
sun[1] = 0;
sun[2] = "star";
sun[3] = 0;
sun[4] = -300;
sun[5] = 1.9891 * (10**(30)) //mass of sun in kg

//initial accelerations
sun[6] = 0
sun[7] = 0

earth[6] = xForce(sun, earth)
earth[7] = 0

var alec = [];
alec[0] = -1.496 * (10**(11));
alec[1] = 0;
alec[2] = "planet";
alec[3] = 0;
alec[4] = -30000;
alec[5] = 7.348 * (10**(22)) //mass of sun in kg
alec[6] = xForce(sun, alec) + xForce(earth, alec)
alec[7] = 0

bodies.push(earth);
bodies.push(sun);
bodies.push(alec);

//console.table(bodies);
//console.log(bodies[1][2]);


var e = document.getElementById("myCanvas");
var etx = e.getContext("2d");

etx.strokeStyle = "#FFA500";

etx.beginPath();
etx.arc(setdistScale(earth[0] , "meters"),setdistScale(earth[1] , "meters"),13,0,2*Math.PI);

etx.lineWidth = '5';
etx.fillStyle = "#FFFF00";
etx.fill();

etx.stroke();

var a = document.getElementById("myCanvas");
var atx = a.getContext("2d");

atx.strokeStyle = "#00FF00";

atx.beginPath();
atx.arc(setdistScale(alec[0] , "meters"),setdistScale(alec[1] , "meters"),13,0,2*Math.PI);

atx.lineWidth = '5';
atx.fillStyle = "#0000FF";
atx.fill();

atx.stroke();

var s = document.getElementById("myCanvas");
var stx = s.getContext("2d");

stx.strokeStyle = "#FFA500";

stx.beginPath();
stx.arc(setdistScale(sun[0] , "meters"),setdistScale(sun[1] , "meters"),13,0,2*Math.PI);

stx.lineWidth = '5';
stx.fillStyle = "#FFFF00";
stx.fill();

stx.stroke();

//rescale all values to fit in the canvas
function setdistScale(number, unit) {
  if (unit == "meters"){
    return 1000*(number + plutodist) / ((2 * (plutodist))) //diameter of solar system to pluto
  }
}

//rescale actual size of canvas
function changeDist(){
  plutodist = 1 * document.getElementById("Distance").value;
  console.log( document.getElementById("Distance").value );

  clearCanvas();

  for (let k = 0; k < bodies.length; k++){
    let cnvs = document.getElementById("myCanvas");
    var body = cnvs.getContext("2d");

    switch(bodies[k][2]){
      case "moon":

      body.strokeStyle = "#3d3d3d";
      body.beginPath();
      body.arc(setdistScale(bodies[k][0] , "meters"),setdistScale(bodies[k][1] , "meters"),13,0,2*Math.PI);

      body.lineWidth = '5';
      body.fillStyle = "#949494";
      body.fill();

      body.stroke();

      break;
      case "planet":

      body.strokeStyle = "#00FF00";
      body.beginPath();
      body.arc(setdistScale(bodies[k][0] , "meters"),setdistScale(bodies[k][1] , "meters"),13,0,2*Math.PI);

      body.lineWidth = '5';
      body.fillStyle = "#0000FF";
      body.fill();

      body.stroke();

      break;
      case "star":

      body.strokeStyle = "#FFA500";
      body.beginPath();
      body.arc(setdistScale(bodies[k][0] , "meters"),setdistScale(bodies[k][1] , "meters"),13,0,2*Math.PI);

      body.lineWidth = '5';
      body.fillStyle = "#FFFF00";
      body.fill();

      body.stroke();

      break;
      default:
      body.strokeStyle = "#FEFEBE";
      body.beginPath();
      body.arc(setdistScale(bodies[k][0] , "meters"),setdistScale(bodies[k][1] , "meters"),13,0,2*Math.PI);

      body.lineWidth = '1';
      body.fillStyle = "#000000";
      body.fill();

      body.stroke();
    }
  }
}

//empty canvas of all bodies
function clearCanvas(){
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//in the modal, allow user to add a body with specified parameter
var addbtn = document.getElementById("subAddBody");

addbtn.onclick = function() {
  bodies.push( [1 * document.getElementById("xPos").value, 1 * document.getElementById("yPos").value,  document.getElementById("bodyType").value, 1 * document.getElementById("mass").value, 1 * document.getElementById("xVel").value, 1 * document.getElementById("yVel").value]);

  console.table(bodies);
  console.log(bodies.length - 1);

  let cnvs = document.getElementById("myCanvas");
  var body = cnvs.getContext("2d");

  switch(bodies[bodies.length - 1][2]){
    case "moon":

    body.strokeStyle = "#3d3d3d";
    body.beginPath();
    body.arc(setdistScale(bodies[bodies.length - 1][0] , "meters"),setdistScale(bodies[bodies.length - 1][1] , "meters"),13,0,2*Math.PI);

    body.lineWidth = '5';
    body.fillStyle = "#949494";
    body.fill();

    body.stroke();

    break;
    case "planet":

    body.strokeStyle = "#00FF00";
    body.beginPath();
    body.arc(setdistScale(bodies[bodies.length - 1][0] , "meters"),setdistScale(bodies[bodies.length - 1][1] , "meters"),13,0,2*Math.PI);

    body.lineWidth = '5';
    body.fillStyle = "#0000FF";
    body.fill();

    body.stroke();

    break;
    case "star":

    body.strokeStyle = "#FFA500";
    body.beginPath();
    body.arc(setdistScale(bodies[bodies.length - 1][0] , "meters"),setdistScale(bodies[bodies.length - 1][1] , "meters"),13,0,2*Math.PI);

    body.lineWidth = '5';
    body.fillStyle = "#FFFF00";
    body.fill();

    body.stroke();

    break;
    default:
    body.strokeStyle = "#FEFEBE";
    body.beginPath();
    body.arc(setdistScale(bodies[bodies.length - 1][0] , "meters"),setdistScale(bodies[bodies.length - 1][1] , "meters"),13,0,2*Math.PI);

    body.lineWidth = '1';
    body.fillStyle = "#000000";
    body.fill();

    body.stroke();
  }
}

//find the force on b from a
function xForce(a , b){ //input two bodies, gives force

  var deltax = a[0] - b[0]
  var deltay = b[1] - a[1]

  //console.log(deltax)

  //var r = [deltax,deltay] #distance between them. used to detect collisions
  var h = Math.sqrt( (deltax)**2 + (deltay)**2 )

  //console.log(h)

  var cos = deltax / h

  //console.log(cos * (G*a[5]/(h**2)))

  return  cos * (G*a[5]/(h**2))
}

//find the force on b from a
function yForce(a , b){ //input two bodies, gives force

  var deltax = a[0] - b[0]
  var deltay = b[1] - a[1]

  //var r = [deltax,deltay] #distance between them. used to detect collisions
  var h = Math.sqrt( (deltax)**2 + (deltay)**2 )

  var sin = deltay / h

  return - sin * (G*a[5]/(h**2))
}

function setTimer() {
  setInterval(movePlanets, 1);
}

var dt = 86400 / 1000 //time step in s

function changeTime(){
  switch (document.getElementById("time").value) {
    case "day": dt = 86400 / 1000
    break;
    case "week": dt = 604800 / 1000
    break;
    case "month": dt = (2.628 * 10**6) / 1000
    break;
    case "year": dt = (3.154 * 10**7) / 1000
    break;
    case "decade": dt = (3.154 * 10**8) / 1000
    break;
    case "century": dt = (3.154 * 10**9) / 1000
    break;
    default: dt = 86400 / 1000

  }
}

function movePlanets(){

  if (play) {

    for (let i = 0; i < bodies.length; i++) {
      var ax = 0;
      var ay = 0;
      for (let j = 0; j < bodies.length; j++){
        if (i != j){
          ax += xForce(bodies[j] , bodies[i])
          ay += yForce(bodies[j] , bodies[i])
        }
      }
      //update accelerations
      bodies[i][6] = ax;
      bodies[i][7] = ay;

      //update velocities
      bodies[i][3] += ax * dt;
      bodies[i][4] += ay * dt;

      //update positions
      bodies[i][0] += (bodies[i][3] * dt) + ((ax * dt**2) / 2);
      bodies[i][1] += (bodies[i][4] * dt) + ((ay * dt**2) / 2);
    }

    // clear canvas
    clearCanvas();

    //console.log(bodies[1][0], bodies[1][1]);

    for (let k = 0; k < bodies.length; k++){
      let cnvs = document.getElementById("myCanvas");
      var body = cnvs.getContext("2d");

      switch(bodies[k][2]){
        case "moon":

        body.strokeStyle = "#3d3d3d";
        body.beginPath();
        body.arc(setdistScale(bodies[k][0] , "meters"),setdistScale(bodies[k][1] , "meters"),13,0,2*Math.PI);

        body.lineWidth = '5';
        body.fillStyle = "#949494";
        body.fill();

        body.stroke();

        break;
        case "planet":

        body.strokeStyle = "#00FF00";
        body.beginPath();
        body.arc(setdistScale(bodies[k][0] , "meters"),setdistScale(bodies[k][1] , "meters"),13,0,2*Math.PI);

        body.lineWidth = '5';
        body.fillStyle = "#0000FF";
        body.fill();

        body.stroke();

        break;
        case "star":

        body.strokeStyle = "#FFA500";
        body.beginPath();
        body.arc(setdistScale(bodies[k][0] , "meters"),setdistScale(bodies[k][1] , "meters"),13,0,2*Math.PI);

        body.lineWidth = '5';
        body.fillStyle = "#FFFF00";
        body.fill();

        body.stroke();

        break;
        default:
        body.strokeStyle = "#FEFEBE";
        body.beginPath();
        body.arc(setdistScale(bodies[k][0] , "meters"),setdistScale(bodies[k][1] , "meters"),13,0,2*Math.PI);

        body.lineWidth = '1';
        body.fillStyle = "#000000";
        body.fill();

        body.stroke();
      }
    }
  }
}

// button stuff
//jQuery.noConflict();
var play = false;
jQuery(document).ready(function(){
  var btn = jQuery(".specialbutton");
  btn.click(function() {
    play = !play;
    if (play){
      console.log("paused");
      $(".specialbutton").css("border-style", "solid");
      $(".specialbutton").css("border-width", "37px 0 37px 60px");
    } else {
      console.log("playing");
      $(".specialbutton").css("border-style", "double");
      $(".specialbutton").css("border-width", "0px 0 0px 60px");
    }

  });
});
