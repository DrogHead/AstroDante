class Planet {

    constructor(x, y, z, wx, wy, wz, r, v, textr) {
        this.x = x;
        this.y = y;
        this.d = Math.sqrt(x*x+y*y);
        this.z = z;
        this.wx = wx;
        this.wy = wy;
        this.wz = wz;
        this.r = r;
        this.angle = 0;
        this.v = v
        this.textr = textr;
    }

    rotateAbout() {
        this.x = this.d * Math.cos(RAD*this.angle);
        this.y = this.d * Math.sin(RAD*this.angle);
    }

    increaseAngle() {
        this.angle += (1+this.v);
    }

    show() {
        translate(this.x, this.y, this.z);

        push();

        rotateX(frameCount*this.wx);
        rotateY(frameCount*this.wy);
        rotateZ(frameCount*this.wz);

        texture(this.textr);
        sphere(this.r);
        pop();
        translate(-this.x, -this.y, -this.z);
    }

}