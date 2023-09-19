import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			0, 0, 1,	//1
			1, 0, 1,	//2
			1, 0, 0,	//3
            0, 1, 0,	//4
			0, 1, 1,	//5
			1, 1, 1,	//6
			1, 1, 0		//7

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 3,
			1, 2, 3,
            4, 5, 7,
            5, 6, 7,
            5, 1, 6,
            1, 2, 6,
            4, 0, 5,
            0, 1, 5,
            6, 2, 7,
            2, 3, 7,
            4, 0, 7,
            0, 3, 7,
			3, 4, 7,
			3, 0, 4,
			1, 3, 2,
			1, 0, 3
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}