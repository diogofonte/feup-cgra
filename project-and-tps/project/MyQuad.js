import {CGFobject} from '../lib/CGF.js';

export class MyQuad extends CGFobject {
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
			0, 0, 0,	//0
			0, 0, 1,	//1
			1, 0, 1,	//2
			1, 0, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 3,
            5, 4, 6,
            6, 4, 7
		];

		this.normals = [
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0
		];

		this.texCoords = [
			0,0,
			0,1,
			1,1,
			1,0,
			0,0,
			0,1,
			1,1,
			1,0
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

