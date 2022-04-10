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
earth[2] = "planet"; //class of body: used to find out what colors to use
earth[3] = 0;
earth[4] = 5700; //initial y velocity
earth[5] = 1.024 * (10**(26)) //neptune mass in kg

var sun = [];
sun[0] = 0;
sun[1] = 0;
sun[2] = "star";
sun[3] = 0;
sun[4] = 0;
sun[5] = 1.9891 * (10**(30)) //mass of sun in kg

//initial accelerations
sun[6] = 0
sun[7] = 0

earth[6] = xForce(sun, earth)
earth[7] = 0

bodies.push(earth);
bodies.push(sun);

console.table(bodies);
console.log(bodies[1][2]);


var e = document.getElementById("myCanvas");
var etx = e.getContext("2d");

etx.strokeStyle = "#00FF00";

etx.beginPath();
etx.arc(setdistScale(earth[0] , "meters"),setdistScale(earth[1] , "meters"),20,0,2*Math.PI);

etx.lineWidth = '5';
etx.fillStyle = "#0000FF";
etx.fill();

etx.stroke();

var s = document.getElementById("myCanvas");
var stx = s.getContext("2d");

stx.strokeStyle = "#FFA500";

stx.beginPath();
stx.arc(setdistScale(sun[0] , "meters"),setdistScale(sun[1] , "meters"),20,0,2*Math.PI);

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
    //console.log(earth[1])

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

    for (let k = 0; k < bodies.length; k++){
      
    }

    // clear canvas
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();

    var s = document.getElementById("myCanvas");
    var stx = s.getContext("2d");

    stx.strokeStyle = "#FFA500";

    stx.beginPath();
    stx.arc(setdistScale(sun[0] , "meters"),setdistScale(sun[1] , "meters"),20,0,2*Math.PI);

    stx.lineWidth = '5';
    stx.fillStyle = "#FFFF00";
    stx.fill();

    stx.stroke();

    //updating neptune
    var e = document.getElementById("myCanvas");
    var etx = e.getContext("2d");

    etx.strokeStyle = "#00FF00";

    etx.beginPath();
    etx.arc(setdistScale(earth[0] , "meters"),setdistScale(earth[1] , "meters"),20,0,2*Math.PI);

    etx.lineWidth = '5';
    etx.fillStyle = "#0000FF";
    etx.fill();

    etx.stroke();
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