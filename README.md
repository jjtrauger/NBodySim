# NBodySim

CFPDemo was a proof of concept, in which I show the canvas can be wiped and redrawn rapidly. While the original javascript file has been drastically changed
and deemed useless, you can see it at volgadorf.com/CFPDemo.html

BinaryDemo.html is a proper set up of the simulator, in which a canvas is shown alongside some interactable buttons and inputs: users can change the distance
scaling of the canvas, delete a body, delete all bodies, add bodies, play and pause the simulations, and change the time scale.

CFPDemo.js is the file that contains the physics engine and changes the canvas. It is initiated with two stars and a planet with the canvas scaled to the solar system's
radius (to Pluto's orbit). X and Y forces are calculated separately, and velocities are all approximated by a glorified version of Euler's Method. Positions
are updated based on the current velocity, so increasing the time scale results in less accurate velocity and positional arguments. There is an accuracy modifier
to implement dynamic timestepping, divided by the complexity of the calculations in order to preserve performance. I may allow users to change this in the future
so they can adjust the accuracy to suit their machine. To see the site in action, observe volgadorf.com/BinaryDemo.html

final.CSS simply makes elements of the site look prettier, as is usual. Dark mode is easier on the eyes and fits with the canvas better.
