const RAD = Math.PI / 180;
const defDIM = 1250;
const defFOV = 1/3;

let stars;

let textures = [];
let bodies = [];

let sizes = [30, 15, 15, 25, 50, 30, 50, 40, 0];
let velos = [0, 1, 0.9, 0.8, 0.2, 0.7, 0.3, 0.4];


function setup() {

    // Loading the textures
    stars = loadImage("textures/2k_stars.jpg");
    textures[0] = loadImage("textures/2k_earth_daymap.jpg");
    textures[1] = loadImage("textures/2k_moon.jpg");
    textures[2] = loadImage("textures/2k_mercury.jpg");
    textures[3] = loadImage("textures/2k_venus_surface.jpg");
    textures[4] = loadImage("textures/2k_sun.jpg");
    textures[5] = loadImage("textures/2k_mars.jpg");
    textures[6] = loadImage("textures/2k_jupiter.jpg");
    textures[7] = loadImage("textures/2k_saturn.jpg");

    // FOV, capped at 0.5, default is 1/3
    let p = 0.4;
    if (p > 0.5) {
        p = 0.5;
    }

    // Dimension of the screen, default is 1250
    let dim = 1000;
    createCanvas(dim, dim, WEBGL);
    perspective(p * Math.PI);

    // Scale the planets' size accordingly
    for (let i = 0; i < textures.length; i++) {
        sizes[i] *= dim/defDIM;
    }

    // Initializing planets
    let dist = 0;
    for (let i = 0; i < textures.length; i++) {
        bodies[i] = new Planet(
            // position
            Math.pow(-1, i)*dist, 0, 0,
            // rotation
            0, (textures.length - i + 0.5) / 80, 0,
            // size and velocity
            sizes[i], velos[i],
            // texture
            textures[i]
        );
        // change distance
        dist += sizes[i] + 2 * sizes[i + 1] + (i == 0 ? 10 : 0);
    }

}


function draw() {

    background(0);
    constructPurgatory();
    constructBackgroundPlane();
    
    orbitControl();

    bodies.forEach(b => {
        b.show()
    });

    bodies.forEach(b => {
        b.rotateAbout();
        b.increaseAngle();
    });


}


// constructs the stars background as a plane
function constructBackgroundPlane() {
    translate(0, 0, 0);
    push();
    texture(stars);
    plane(1000);
    pop();
    translate(0, 0, 0);
}

// constructs the cone on earth representing purgatory
function constructPurgatory() {
    translate(0, -sizes[0], 0);
    push();
    normalMaterial();
    cone(0.6*sizes[0], -sizes[0], 10, 3, false);
    pop();
    translate(0, sizes[0], 0);
}