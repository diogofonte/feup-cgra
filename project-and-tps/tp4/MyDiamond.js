import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
	constructor(scene,coords) {
		super(scene);
		this.initDiamondMat();
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
		
	}

	initDiamondMat(){
		this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.diamondMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.diamondMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.diamondMaterial.setShininess(10.0);
        this.diamondMaterial.loadTexture('images/tangram.png');
        this.diamondMaterial.setTextureWrap('REPEAT', 'REPEAT');

	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0,	//3
			-1, 0, 0,	//4
			0, -1, 0,	//5
			0, 1, 0,	//6
			1, 0, 0		//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,
			1, 0, 2,
			3, 1, 2
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1
		]

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	

	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

