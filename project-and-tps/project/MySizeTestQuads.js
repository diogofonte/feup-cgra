import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySizeTestQuads extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.test1 = new MyQuad(this.scene);
        this.test2 = new MyQuad(this.scene);
        //red
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(0.1, 0.1, 0.1, 1);
        this.red.setDiffuse(1, 0, 0, 1);
        this.red.setSpecular(1, 1, 1, 0);
        this.red.setShininess(10.0);
        // Green
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0.1, 0.1, 0.1, 1);
        this.green.setDiffuse(0, 1, 0, 1);
        this.green.setSpecular(1, 1, 1, 0);
        this.green.setShininess(10.0);
	}

    display(){
        //test Dimensions
        this.scene.pushMatrix();

        var anglee = 90 * Math.PI/180;
        this.scene.rotate(anglee,1,0,0);
        this.scene.translate(-1.5,-0.88,-2);
        this.scene.scale(3,3,3);
        this.red.apply();
        this.test1.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        var angle = 90 * Math.PI/180;
        this.scene.rotate(angle,0,0,1);
        this.scene.translate(0,1.5,-0.88);
        this.scene.scale(2,2,2);
        this.green.apply();
        this.test1.display();

        this.scene.popMatrix();
    }
}

