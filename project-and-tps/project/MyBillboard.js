import {CGFobject, CGFappearance, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyBillboard extends CGFobject {
    constructor(scene,x,y,z) {
        super(scene);
        this.x = x
		this.y = y
		this.z = z
        this.quad = new MyQuad(this.scene);
    }

    display() {
        // calculate the vector from the origin of the quad to the camera position
        const toCamera = vec3.create();
        vec3.subtract(toCamera, this.scene.camera.position, [this.x, this.y, this.z]);
        vec3.normalize(toCamera, toCamera);
      
        // calculate the rotation angle around the y-axis
        const angle = Math.atan2(toCamera[0], toCamera[2]);
        
        this.scene.pushMatrix();

        this.appearance.apply()
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
        this.scene.rotate(-angle, 0, 0, 1);
        this.scene.scale(8.5 + this.scaleX,1,10.5 + this.scaleZ);
        this.quad.display();

        this.scene.popMatrix();
    }  
}