import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MyWingEnd } from './MyWingEnd.js';
import { MyCylinder } from './MyCylinder.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.wingEnd = new MyWingEnd(this.scene);
        this.wingUpper = new MyCylinder(this.scene,30,30);

        this.endTexture = new CGFappearance(this.scene);
        this.endTexture.setAmbient(0, 0, 0, 1);
        this.endTexture.setDiffuse(0, 0, 0, 1);
        this.endTexture.setSpecular(1, 1, 1, 0);
        this.endTexture.setShininess(10.0);

        this.upperTexture = new CGFappearance(this.scene);
        this.upperTexture.setAmbient(1, 1, 1, 1);
        this.upperTexture.setDiffuse(1, 1, 1, 1);
        this.upperTexture.setSpecular(1, 1, 1, 0);
        this.upperTexture.setShininess(10.0);
	}

    display() {
        this.scene.pushMatrix();

        var angle = -90 * Math.PI/180;
        this.scene.rotate(angle,0,1,0);
        this.scene.translate(0,0,0.3);
        this.scene.scale(0.51,0.26,0.9);
        this.upperTexture.apply();
        this.wingUpper.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(-1,0,0);
        this.scene.scale(0.8,0.25,0.5);
        this.scene.translate(-0.2,0,0);
        this.endTexture.apply();
        this.wingEnd.display();

        this.scene.popMatrix();
    }
}