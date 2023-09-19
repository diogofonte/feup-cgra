import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene,slices,stacks) {
		super(scene);
        this.slices = slices;
        this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var normalAng = 0;
        var x = 0;

        for (var j=0;j<this.stacks;j++){
           
            for(var i = 0; i < this.slices; i++){
                
                normalAng = i * alphaAng;

                this.vertices.push(Math.cos(ang), Math.sin(ang), j/this.stacks);
                this.vertices.push(Math.cos(ang), Math.sin(ang), (1+j)/this.stacks);

                this.normals.push(Math.cos(normalAng), Math.sin(normalAng), 0);
                this.normals.push(Math.cos(normalAng), Math.sin(normalAng), 0);
                
                ang += alphaAng;

                this.indices.push((x % (this.slices*2)) + (j*this.slices*2), ((x +2) % (this.slices*2))+ (j*this.slices*2), ((x  +3) % (this.slices*2))+ (j*this.slices*2));
				this.indices.push(((x+3)% (this.slices*2 ))+ (j*this.slices*2), ((x+1)% (this.slices*2))+ (j*this.slices*2), (x% (this.slices*2))+ (j*this.slices*2));

                x += 2;
            }
      
            var normalAng = 0;
            var ang = 0;
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

    updateBuffers() {

    }
}