


import {CGFobject} from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
	constructor(scene, radius, slices, stacks, isPanorama) {
		super(scene);
		this.radius = radius;
		this.slices = slices;
		this.stacks = stacks;
		this.isPanorama = isPanorama
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var ang = 0;
		var alphaAng = 2*Math.PI/this.slices;
		var betaAng = Math.PI/this.stacks;

		for (var i = 0; i <= this.stacks; i++) {
			var beta = i * betaAng;

			for (var j = 0; j <= this.slices; j++) {
				var alpha = j * alphaAng;

				var x = Math.cos(alpha) * Math.sin(beta);
				var y = Math.sin(alpha) * Math.sin(beta);
				var z = Math.cos(beta);

				this.vertices.push(this.radius * x, this.radius * y, this.radius * z);
				if (this.isPanorama){
					this.normals.push(-x, -y, -z);
				}
				else{
					this.normals.push(x, y, z);
				}
				
	
				this.texCoords.push(j / this.slices, i / this.stacks);
			}
		}

		for (var i = 0; i < this.stacks; i++) {
			for (var j = 0; j < this.slices; j++) {
				var a = i * (this.slices + 1) + j;
				var b = a + this.slices + 1;

				if (this.isPanorama){
					this.indices.push(a + 1, b, a );
					this.indices.push(a + 1, b + 1,b);
				}
				else{
					this.indices.push(a, b, a + 1);
					this.indices.push(b, b + 1, a + 1);
				}
				

				
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateBuffers() {

	}
}
