import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
	}
	
	display(){

        this.scene.myQuad.display();

        //----------------------------------

        this.scene.pushMatrix();

        this.scene.translate(0,1,0);
        this.scene.myQuad.display();

        this.scene.popMatrix();

        //----------------------------------

        this.scene.pushMatrix();

        var angle = -90 * Math.PI / 180
        this.scene.rotate(angle,1,0,0)
        this.scene.myQuad.display();

        this.scene.popMatrix();

        //----------------------------------

        this.scene.pushMatrix();

        var angle = 90 * Math.PI / 180
        this.scene.rotate(angle,0,0,1)
        this.scene.myQuad.display();

        this.scene.popMatrix();

        //----------------------------------

        this.scene.pushMatrix();

        var angle = -90 * Math.PI / 180
        this.scene.rotate(angle,1,0,0)
        this.scene.translate(0,-1,0)
        this.scene.myQuad.display();

        this.scene.popMatrix();

        //----------------------------------

        this.scene.pushMatrix();

        var angle = 90 * Math.PI / 180
        this.scene.rotate(angle,0,0,1)
        this.scene.translate(0,-1,0)
        this.scene.myQuad.display();
        
        this.scene.popMatrix();
    }
}

